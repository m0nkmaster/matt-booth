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

**Quick workflow:** Run `./scripts/new-post "Your Title"` to create a post and its image folder. See `QUICK_POST.md` for the full workflow.

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
- `scripts/new-post` — Quick post creation script
- `index.html` — Home page with post listing

### Comments (utterances)

Comments use [utterances](https://utteranc.es/) which maps each post to a GitHub Issue. The repo owner must install the [utterances GitHub App](https://github.com/apps/utterances) on this repository to enable comments.

### Deployment

Push to `main` — GitHub Pages builds and deploys automatically. No manual build step needed.
