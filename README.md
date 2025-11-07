# shhreyuuFW Portfolio Website

A modern, minimal portfolio website with dynamic content management capabilities. Built for GitHub Pages with a sleek maroon and red color theme.

## Features

- **About Me**: Personal introduction with animated statistics
- **Projects**: Showcase your work with descriptions, technologies, and links
- **Skills**: Display your technical skills with progress bars and categories
- **Blog**: Write and publish blog posts with tags and timestamps
- **Dashboard**: Full content management system to add, edit, and delete content
- **Responsive Design**: Works perfectly on all devices
- **Modern Animations**: Smooth transitions and engaging effects
- **Client-Side Storage**: All data stored in browser's localStorage (perfect for GitHub Pages)

## Color Theme

- Maroon: `#800000`
- Dark Red: `#8B0000`
- Bright Red: `#DC143C`
- Near Black: `#1a1a1a`
- Off White: `#f5f5f5`

## Usage

### Viewing the Site

Simply open `index.html` in a browser or visit the GitHub Pages URL.

### Managing Content

1. Navigate to the **Dashboard** section (last item in navigation)
2. Use the tabs to switch between managing Projects, Skills, Blog posts, and About section
3. Fill in the forms and click Save to add or update content
4. Use Edit/Delete buttons to manage existing content
5. All changes are saved automatically in your browser's localStorage

### Deploying to GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select the branch to deploy (usually `main` or `master`)
4. Your site will be available at `https://[username].github.io/[repository-name]`

## Project Structure

```
├── index.html      # Main HTML structure
├── styles.css      # All styling with modern animations
├── script.js       # JavaScript for interactivity and data management
└── README.md       # This file
```

## Customization

### Update Personal Information

Edit the hero section in `index.html` and update the About section through the Dashboard.

### Modify Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --maroon: #800000;
    --dark-red: #8B0000;
    --bright-red: #DC143C;
    --near-black: #1a1a1a;
    --off-white: #f5f5f5;
}
```

### Add Social Links

Update the footer section in `index.html` with your actual social media URLs.

## Browser Compatibility

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT License - Feel free to use this template for your own portfolio!