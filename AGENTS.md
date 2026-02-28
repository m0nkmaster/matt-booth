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

### Writing Posts

Add Markdown files to `_posts/` with the naming convention `YYYY-MM-DD-slug.md`. Required front matter:

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
- `index.html` — Home page with post listing

### Comments (Cusdis)

Comments use [Cusdis](https://cusdis.com/) — visitors can comment with just a nickname, no account or sign-in required. To enable: sign up at cusdis.com, create a project, copy your app ID, and add it to `_config.yml` under `cusdis.app_id`.

### Deployment

Push to `main` — GitHub Pages builds and deploys automatically. No manual build step needed.
