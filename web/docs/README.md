# Web Application Documentation

## Overview

This web application provides an interactive interface for exploring the Iterative Workflow Optimization Strategies (IWOS) framework. The application is built with modern web technologies and follows best practices for accessibility, performance, and user experience.

## Technology Stack

- **HTML5**: Semantic markup for content structure
- **CSS3**: Modern styling with CSS custom properties (variables)
- **JavaScript (ES6+)**: Interactive functionality and dynamic behavior
- **JSON**: Configuration and data management

## Project Structure

```
web/
├── index.html              # Main landing page
├── about.html              # About page
├── documentation.html      # Documentation page
├── css/
│   ├── main.css           # Main stylesheet
│   └── responsive.css     # Responsive design styles
├── js/
│   ├── app.js             # Main application logic
│   ├── navigation.js      # Navigation functionality
│   └── theme.js           # Theme switcher
├── data/
│   ├── config.json        # Application configuration
│   └── data.json          # Framework data
├── images/                # Image assets
└── docs/                  # Documentation files
    ├── README.md          # This file
    ├── API.md             # API documentation
    └── ...                # Additional docs
```

## Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Accessible navigation

### 2. Theme Switching
- Light and dark themes
- Automatic theme persistence
- System preference detection
- Smooth theme transitions

### 3. Interactive Navigation
- Smooth scrolling to sections
- Active link highlighting
- Mobile hamburger menu
- Scroll-based header behavior

### 4. Performance Optimizations
- Minimal external dependencies
- Optimized CSS and JavaScript
- Lazy loading for images
- Debounced scroll handlers

### 5. Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast mode support
- Reduced motion support

## Getting Started

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/adamf9898/Iterative-Workflow-Optimization-Strategies.git
cd Iterative-Workflow-Optimization-Strategies/web
```

2. Open in a web browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Or simply open index.html in your browser
```

3. Navigate to `http://localhost:8000` in your browser

### Deployment

The application can be deployed to any static hosting service:

- **GitHub Pages**: Configured in repository settings
- **Netlify**: Drag and drop the `web` folder
- **Vercel**: Connect repository and set build directory
- **AWS S3**: Upload files to S3 bucket with static hosting

## Configuration

### Theme Configuration

Edit `data/config.json` to customize theme settings:

```json
{
  "theme": {
    "defaultTheme": "light",
    "enableThemeToggle": true,
    "storageKey": "iwos-theme"
  }
}
```

### Navigation Configuration

Customize navigation behavior in `data/config.json`:

```json
{
  "navigation": {
    "enableSmoothScroll": true,
    "scrollOffset": 80,
    "mobileBreakpoint": 768
  }
}
```

## Customization

### Colors

Modify CSS variables in `css/main.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --accent-color: #f59e0b;
    /* ... */
}
```

### Typography

Update font families in `css/main.css`:

```css
:root {
    --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
    --font-mono: 'Monaco', 'Courier New', monospace;
}
```

### Content

Edit HTML files directly to modify content:
- `index.html` - Main landing page
- `about.html` - About page
- `documentation.html` - Documentation page

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the terms specified in the LICENSE file.

## Support

For questions or issues:
- Create an issue on GitHub
- Refer to the main repository documentation
- Check the FAQ section

## Changelog

### Version 1.0.0 (2026-02-11)
- Initial release
- Core framework pages
- Responsive design
- Theme switcher
- Interactive navigation
