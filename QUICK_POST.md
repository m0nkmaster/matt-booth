# Quick post publishing

Simple workflow: **drop a folder, run one command.**

## The workflow

1. **Create a folder** in `_drafts/` with a short name (e.g. `orion-nebula`)

2. **Add `content.txt`** — simple format:
   ```
   First line: Post title
   Second line: Short description (for the listing)
   Third line: blank
   Fourth line onwards: Your post body (markdown allowed)
   ```

3. **Add images** — drop JPG/PNG files in the same folder. Reference them in the body:
   ```markdown
   ![Orion Nebula](/assets/images/orion-nebula/orion-final.jpg)
   ```
   Or just `![](orion-final.jpg)` — the script rewrites paths automatically.

4. **Publish:**
   ```bash
   ./scripts/publish-post orion-nebula
   ```

The script creates the Jekyll post, copies images to `assets/images/`, and deletes the draft.

## Publish all drafts at once

```bash
./scripts/publish-post
```

(No argument = publishes every folder in `_drafts/`)

## Publish from a single file

If you have a text file (e.g. pasted from Slack/WhatsApp):

```bash
./scripts/publish-post -f path/to/post.txt
```

Same format: line 1 = title, line 2 = description, line 4+ = body. Images in the same folder are included.

## Example

```bash
mkdir -p _drafts/horsehead-nebula
```

Create `_drafts/horsehead-nebula/content.txt`:

```
First Light: The Horsehead Nebula
Dark dust meets emission nebulae in Orion.

Every astrophotographer has a bucket list. The Horsehead was near the top of mine...
```

Add `horsehead-final.jpg` to the same folder. In the body, add:

```
![](horsehead-final.jpg)
```

Then:

```bash
./scripts/publish-post horsehead-nebula
```

Done.
