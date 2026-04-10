# IWOS Web Application

A modern, responsive web application for the Iterative Workflow Optimization Strategies framework.

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Use a Local Server
For the best experience, use a local web server:

**Using Python:**
```bash
cd web
python -m http.server 8080
# Visit http://localhost:8080
```

**Using Node.js:**
```bash
cd web
npx http-server -p 8080
# Visit http://localhost:8080
```

**Using PHP:**
```bash
cd web
php -S localhost:8080
# Visit http://localhost:8080
```

## 📁 Project Structure

```
web/
├── index.html              # Main landing page
├── about.html              # About IWOS framework
├── documentation.html      # Comprehensive documentation
├── css/
│   ├── main.css           # Core styles and design system
│   └── responsive.css     # Responsive breakpoints and media queries
├── js/
│   ├── app.js             # Main application logic
│   ├── navigation.js      # Navigation and menu functionality
│   └── theme.js           # Light/dark theme switcher
├── data/
│   ├── config.json        # Application configuration
│   └── data.json          # Framework data (principles, phases, metrics)
├── images/                # Image assets folder
└── docs/
    ├── README.md          # Detailed web app documentation
    ├── API.md             # API and data structure documentation
    ├── task-template.md   # Task definition template
    ├── retrospective-template.md  # Retrospective template
    ├── metrics-template.md        # Metrics dashboard template
    └── workflow-mapping-template.md  # Workflow mapping template
```

## ✨ Features

### 🎨 Design
- **Modern UI**: Clean, professional interface with thoughtful typography
- **Responsive Design**: Mobile-first approach, works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Accessibility**: ARIA labels, keyboard navigation, high contrast support

### 🧭 Navigation
- **Smooth Scrolling**: Seamless navigation between sections
- **Active Link Highlighting**: Visual indication of current section
- **Mobile Menu**: Hamburger menu for mobile devices
- **Sticky Header**: Navigation always accessible

### 📱 Responsive Breakpoints
- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px
- **Large Desktop**: > 1200px

### 🎯 Interactive Features
- **Workflow Phase Cards**: Interactive cards showing all 9 phases
- **Principle Explanations**: Detailed breakdown of 4 core principles
- **Documentation Browser**: Comprehensive documentation with sidebar navigation
- **Theme Persistence**: Your theme choice is saved

## 🎨 Customization

### Colors
Edit CSS custom properties in `css/main.css`:

```css
:root {
    --primary-color: #2563eb;     /* Primary brand color */
    --secondary-color: #7c3aed;   /* Secondary accent */
    --accent-color: #f59e0b;      /* Highlights */
    /* ... more colors ... */
}
```

### Typography
Change fonts in `css/main.css`:

```css
:root {
    --font-primary: -apple-system, BlinkMacSystemFont, ...;
}
```

### Content
- Edit HTML files directly for content changes
- Modify `data/data.json` for framework data
- Update `data/config.json` for app settings

## 📊 Data Configuration

### Application Config (`data/config.json`)
Controls application behavior:
- Theme settings
- Navigation options
- Feature toggles
- API configuration
- UI preferences

### Framework Data (`data/data.json`)
Contains IWOS framework information:
- Principles (4 core principles)
- Workflow Phases (9 phases)
- Metrics definitions
- Resource links
- Examples

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **JSON**: Configuration and data storage

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### No Build Process Required
This is a static website with no build dependencies. All code runs directly in the browser.

## 📚 Documentation Templates

The `docs/` folder includes ready-to-use templates:

1. **Task Template**: Define iterative tasks with clear objectives
2. **Retrospective Template**: Conduct effective team retrospectives
3. **Metrics Template**: Track KPIs and improvement metrics
4. **Workflow Mapping Template**: Map existing workflows to IWOS phases

## 🚀 Deployment

### GitHub Pages
1. Push to repository
2. Enable GitHub Pages in repository settings
3. Set source to `main` branch and `/web` folder
4. Access at `https://username.github.io/repository-name/`

### Netlify
1. Drag and drop the `web` folder to Netlify
2. Or connect your repository
3. Set build directory to `web`
4. Deploy

### Vercel
1. Import your repository
2. Set root directory to `web`
3. Deploy

### AWS S3
1. Create S3 bucket with static hosting enabled
2. Upload all files from `web` folder
3. Set index.html as index document
4. Configure permissions for public access

## 🔒 Security

- No external dependencies or CDNs
- No third-party scripts
- All code is local and inspectable
- No data collection or analytics by default

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators for all interactive elements
- Reduced motion support for users with motion sensitivity
- High contrast mode support

## 🐛 Troubleshooting

### CSS Not Loading
- Check file paths are relative
- Ensure you're using a web server (not just file://)
- Clear browser cache

### JavaScript Not Working
- Check browser console for errors
- Ensure JavaScript is enabled
- Verify file paths are correct

### Theme Not Persisting
- Check if localStorage is enabled
- Check browser privacy settings
- Try in a different browser

## 📝 License

This web application is part of the Iterative Workflow Optimization Strategies project.
See the main LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional interactive features
- More comprehensive examples
- Accessibility enhancements
- Performance optimizations
- Internationalization (i18n)

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the documentation in `docs/`
- Review the main repository README

## 📅 Version History

### v1.0.0 (2026-02-11)
- Initial release
- Core pages (Home, About, Documentation)
- Responsive design system
- Theme switcher
- Interactive navigation
- Comprehensive documentation
- Template collection
- JSON data structure

---

**Built with ❤️ for the IWOS community**
