# Quick post publishing

A simple workflow for adding new posts (with images) to thephotonbooth.com.

## One command to create a post

```bash
./scripts/new-post "Your Post Title"
```

This will:

1. Create `_posts/YYYY-MM-DD-your-post-title.md` with the correct front matter
2. Create `assets/images/your-post-title/` for that post's images
3. Print next steps

## Adding images

1. **Copy your images** into the folder the script created, e.g.:
   ```
   assets/images/your-post-title/
   ```

2. **Reference them in Markdown**:
   ```markdown
   ![Orion Nebula final result](/assets/images/your-post-title/orion-final.jpg)
   ```

3. Images are automatically styled: responsive, rounded corners, subtle border.

## Image tips

- **Formats**: JPG or PNG both work; JPG is usually best for astrophotography (smaller files)
- **Naming**: Use lowercase, hyphens: `orion-final.jpg`, `stacked-120-frames.jpg`
- **Size**: Consider resizing large images before adding; GitHub Pages has a 1GB repo limit

## Full workflow

```bash
# 1. Create post + image folder
./scripts/new-post "First Light: The Horsehead Nebula"

# 2. Add your images
cp ~/Pictures/horsehead-final.jpg assets/images/first-light-the-horsehead-nebula/

# 3. Edit the post (add content + image references)
# Use: ![Horsehead](/assets/images/first-light-the-horsehead-nebula/horsehead-final.jpg)

# 4. Preview locally
bundle exec jekyll serve --livereload

# 5. Commit and push
git add _posts/ assets/images/
git commit -m "Add Horsehead Nebula post"
git push
```

## Optional: GitHub web UI

You can also add posts directly on GitHub:

1. Create a new file: `_posts/YYYY-MM-DD-slug.md`
2. Use the **Upload** option to add images to `assets/images/slug/`
3. Reference images with `/assets/images/slug/filename.jpg`

The script just makes this faster when working locally.
