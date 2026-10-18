(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  /* --- Starfield ----------------------------------------------------- */

  function initStarfield() {
    var canvas = document.getElementById("starfield");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var stars = [];
    var meteor = null;
    var nextMeteor = performance.now() + 4000;
    var w, h, running = true;

    var tints = ["255,255,255", "255,255,255", "255,255,255", "200,220,255", "255,214,190", "255,160,170"];

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(Math.round((w * h) / 5200), 420);
      stars = [];
      for (var i = 0; i < count; i++) {
        var big = Math.random() < 0.06;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: big ? 1 + Math.random() * 0.9 : 0.25 + Math.random() * 0.7,
          a: 0.25 + Math.random() * 0.75,
          speed: 0.4 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          tint: tints[(Math.random() * tints.length) | 0]
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var alpha = reduceMotion ? s.a : s.a * (0.65 + 0.35 * Math.sin(t / 1000 * s.speed + s.phase));
        ctx.fillStyle = "rgba(" + s.tint + "," + alpha.toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (reduceMotion) return;

      if (!meteor && t > nextMeteor) {
        meteor = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, life: 0, len: 120 + Math.random() * 120 };
      }
      if (meteor) {
        meteor.life += 1;
        var p = meteor.life / 50;
        var mx = meteor.x - p * 520;
        var my = meteor.y + p * 260;
        var grad = ctx.createLinearGradient(mx, my, mx + meteor.len, my - meteor.len / 2);
        grad.addColorStop(0, "rgba(255,255,255," + (0.9 * (1 - p)).toFixed(3) + ")");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(mx + meteor.len, my - meteor.len / 2);
        ctx.stroke();
        if (p >= 1) {
          meteor = null;
          nextMeteor = t + 7000 + Math.random() * 12000;
        }
      }
    }

    function loop(t) {
      if (!running) return;
      draw(t);
      window.requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", function () {
      resize();
      if (reduceMotion) draw(0);
    });

    if (reduceMotion) {
      draw(0);
      return;
    }

    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) window.requestAnimationFrame(loop);
    });
    window.requestAnimationFrame(loop);
  }

  /* --- Camera flash -------------------------------------------------- */

  function flash() {
    var el = document.querySelector(".flash");
    if (!el || reduceMotion) return;
    el.classList.remove("is-firing");
    void el.offsetWidth;
    el.classList.add("is-firing");
  }

  /* --- The booth ----------------------------------------------------- */

  function initBooth() {
    var booth = document.querySelector("[data-booth]");
    if (!booth) return;
    var countdown = booth.querySelector(".booth-countdown");
    var trigger = booth.querySelector("[data-booth-trigger]");
    var busy = false;

    var quips = [
      ["3", "2", "1", "Smile!"],
      ["3", "2", "1", "...", "Still waiting for photons"],
      ["Hold", "very", "still", "Smile!"],
      ["3", "2", "1", "Cloud.", "Again?"],
      ["3", "2", "1", "Say \u201Cnebula\u201D"]
    ];
    var quipIndex = 0;

    function run(skipAnimation) {
      if (busy) return;
      if (skipAnimation || reduceMotion) {
        booth.classList.add("is-developed");
        return;
      }
      busy = true;
      booth.classList.remove("is-developed");
      booth.classList.add("is-shooting");
      var steps = quips[quipIndex % quips.length];
      quipIndex++;
      var i = 0;

      (function tick() {
        if (i < steps.length) {
          countdown.textContent = steps[i];
          countdown.classList.remove("pop");
          void countdown.offsetWidth;
          countdown.classList.add("pop");
          if (i === steps.length - 1 || steps[i] === "Smile!") flash();
          i++;
          setTimeout(tick, 650);
          return;
        }
        countdown.textContent = "";
        booth.classList.remove("is-shooting");
        booth.classList.add("is-developed");
        busy = false;
      })();
    }

    booth.classList.add("is-armed");
    var seen = false;
    try { seen = window.sessionStorage.getItem("booth-seen") === "1"; } catch (e) {}
    if (seen) {
      run(true);
    } else {
      setTimeout(run, 700);
      try { window.sessionStorage.setItem("booth-seen", "1"); } catch (e) {}
    }

    if (trigger) trigger.addEventListener("click", function () { run(false); });
  }

  /* --- Night vision (red light) mode -------------------------------- */

  function initNightVision() {
    var btn = document.querySelector(".night-toggle");
    if (!btn) return;
    function sync() {
      btn.setAttribute("aria-pressed", root.classList.contains("night-vision") ? "true" : "false");
    }
    sync();
    btn.addEventListener("click", function () {
      root.classList.toggle("night-vision");
      store("night-vision", root.classList.contains("night-vision") ? "1" : "0");
      sync();
    });
  }

  /* --- Reading progress --------------------------------------------- */

  function initProgress() {
    var bar = document.querySelector(".read-progress span");
    var article = document.querySelector(".post-content");
    if (!bar || !article) return;
    var ticking = false;
    function update() {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight * 0.6;
      var done = Math.min(Math.max(-rect.top + window.innerHeight * 0.2, 0), total);
      bar.style.transform = "scaleX(" + (total > 0 ? done / total : 0).toFixed(4) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  /* --- Footer quips -------------------------------------------------- */

  function initQuips() {
    var el = document.querySelector(".footer-quip");
    if (!el) return;
    try {
      var quips = JSON.parse(el.getAttribute("data-quips"));
      el.textContent = quips[(Math.random() * quips.length) | 0];
    } catch (e) {}
  }

  /* --- Logo easter egg ----------------------------------------------- */

  function initLogo() {
    var mark = document.querySelector(".brand .logo-mark");
    if (!mark) return;
    mark.addEventListener("mouseenter", function () {
      mark.classList.remove("wink");
      void mark.getBoundingClientRect();
      mark.classList.add("wink");
    });
  }

  initStarfield();
  initBooth();
  initNightVision();
  initProgress();
  initQuips();
  initLogo();
})();
