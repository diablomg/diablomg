# DiablOMG! Comics - GitHub Pages Site

This is a simple static site for posting daily Agent and DiablOMG! comics.

## Files
- `index.html` - page structure
- `style.css` - visual styling
- `script.js` - comic data, filters, archive logic, and logo / Venmo settings
- `assets/` - comic images and future logo files

## Fast edits
### Change the Venmo link
Open `script.js` and replace:
```js
siteConfig.donateUrl = "https://venmo.com/yourname"
```

### Change the logo later
In `script.js`:
```js
logoMode: "text"
```
Change to:
```js
logoMode: "image"
```
Then set:
```js
logoImageUrl: "assets/your-logo-file.png"
```

### Add a new comic
1. Put the new image in `assets/`
2. Copy the first object in the `comics` array in `script.js`
3. Change the title, date, displayDate, series, month, image, and excerpt
4. Keep the newest comic at the top of the array

## Publish to GitHub Pages
### Option A: simplest
1. Create a new GitHub repository, for example `diablomg-site`
2. Upload all files from this folder to the repo root
3. In GitHub, go to **Settings > Pages**
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/root`
5. Save
6. Wait about a minute and GitHub Pages will publish the site

### Custom domain
1. In the GitHub Pages settings, set your custom domain to `diablomg.com`
2. In Cloudflare DNS, point your domain to GitHub Pages using the records GitHub gives you
3. Turn on HTTPS in GitHub Pages after DNS resolves

## Notes
- This site is static and ad-free unless you add ads yourself later
- It works well for a comic archive because updates are just file + text changes
