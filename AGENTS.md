## Cursor Cloud specific instructions

This repository is **thephotonbooth.com** — Matt Booth's personal blog about amateur astrophotography, built as a static Jekyll site and served from GitHub Pages.

### Tech Stack

- **Jekyll** (static site generator) — GitHub Pages builds it natively
- **Vanilla CSS** — no preprocessors, just plain CSS in `assets/css/main.css`
- **utterances** — comment system backed by GitHub Issues (no database)

### Local Development

```bash
bundle install
bundle exec jekyll serve --livereload
```

The site runs at `http://localhost:4000`.

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

### Comments (utterances)

Comments use [utterances](https://utteranc.es/) which maps each post to a GitHub Issue. The repo owner must install the [utterances GitHub App](https://github.com/apps/utterances) on this repository to enable comments.

### Deployment

Push to `main` — GitHub Pages builds and deploys automatically. No manual build step needed.
