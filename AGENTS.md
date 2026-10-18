## Cursor Cloud specific instructions

This repository is **thephotonbooth.com** — Matt Booth's personal blog about amateur astrophotography, built as a static Jekyll site and served from GitHub Pages.

### Tech Stack

- **Jekyll** (static site generator) — GitHub Pages builds it natively
- **Vanilla CSS** — no preprocessors, just plain CSS in `assets/css/main.css`
- **Cusdis** — lightweight comment system (no sign-in required; optional nickname)

### Local Development

```bash
bundle install
bundle exec jekyll serve --livereload
```

The site runs at `http://localhost:4000`.

On macOS the system Ruby (2.6) is too old for Jekyll 4 — use Homebrew Ruby: `export PATH=/opt/homebrew/opt/ruby/bin:$PATH`, then `bundle config set --local path vendor/bundle` before `bundle install`. Pretty permalinks are on, so `foo.html` is served at `/foo/`.

Note: GitHub Pages builds with Jekyll 3.10 (via `actions/jekyll-build-pages`), so stick to Liquid/Jekyll features that work there and don't add unsupported plugins.

### Design ("the Photon Booth")

The concept is a photo booth, but for photons. Palette is from narrowband filters: `--ha` (Hα red), `--oiii` (teal), `--sii` (amber). Fonts: Space Grotesk (UI/headings), Newsreader (body text), JetBrains Mono (metadata). Behaviour lives in `assets/js/main.js`: starfield canvas, booth countdown/flash + ejecting photo strip (once per session), the red-light "Night vision" toggle, the reading-progress bar, and the rotating footer quips (set in `_layouts/default.html`). All animation respects `prefers-reduced-motion`.

- `_includes/frame-number.html`: zero-padded post number ("Frame 003"). `_includes/read-time.html`: minutes to read.
- `_layouts/page.html`: generic page layout (supports `heading` and `eyebrow` front matter).
- `feed.xml` (Atom), `404.html`, `assets/images/favicon.svg`.

Optional post front matter: `image` (cover, used on cards, the photo strip and OG tags; `publish-post` sets it to the first image), `image_alt`, `target` (shown as OBJECT, e.g. "M42"), `kit` (shown as INSTRUME).

### Writing Posts

**Drop-folder workflow:** Put a folder in `_drafts/` with `content.txt` (title on L1, description on L2, body after) and images. Run `./scripts/publish-post <folder-name>`. See `QUICK_POST.md`. When given content from Matt (e.g. pasted from Slack/WhatsApp), create the draft folder and run `publish-post`.

**Or from a file:** `./scripts/publish-post -f post.txt` — same format, images in same dir.

Manual: Add Markdown files to `_posts/` with the naming convention `YYYY-MM-DD-slug.md`. Required front matter:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
description: "Short description for the post listing."
---
```

### Project Structure

- `_config.yml` — Jekyll site configuration
- `_layouts/` — HTML templates (`default.html`, `post.html`)
- `_posts/` — Blog posts in Markdown
- `assets/css/main.css` — All styles
- `assets/images/<post-slug>/` — Images for each post
- `_drafts/` — Drop folder for posts before publishing
- `scripts/publish-post` — Publishes drafts (or `scripts/new-post` for empty scaffold)
- `index.html` — Home page with post listing

### Comments (Cusdis)

Comments use [Cusdis](https://cusdis.com/) — visitors can comment with just a nickname, no account or sign-in required. To enable: sign up at cusdis.com, create a project, copy your app ID, and add it to `_config.yml` under `cusdis.app_id`.

### Deployment

Push to `main` — GitHub Pages builds and deploys automatically. No manual build step needed.
