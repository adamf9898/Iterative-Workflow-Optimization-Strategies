# 9898-MTG League Website

A complete static website for the 9898-MTG League - a competitive Magic: The Gathering league.

## 🎮 Features

- **Homepage** - Hero section, upcoming events, recent results, and league leaders
- **Standings Page** - Interactive sortable leaderboard with season statistics
- **Schedule Page** - Upcoming and past event listings with detailed information
- **Rules Page** - Comprehensive league rules, point system, and code of conduct
- **Players Page** - Player profile cards with stats and bios
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **MTG-Themed Design** - Dark theme with gold/amber accents inspired by Magic: The Gathering

## 📁 File Structure

```
site/
├── index.html          # Homepage
├── standings.html      # League standings/leaderboard
├── schedule.html       # Event schedule
├── rules.html          # League rules and guidelines
├── players.html        # Player profiles
├── css/
│   └── styles.css      # Complete stylesheet
└── js/
    └── main.js         # JavaScript for interactivity
```

## 🚀 Getting Started

### Viewing Locally

1. Navigate to the `site/` directory
2. Open `index.html` in your web browser
3. All pages are linked via the navigation menu

### Deploying

This is a static website with no build process or dependencies required. Simply upload all files to any web server or hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any traditional web hosting

**Important:** Maintain the directory structure when deploying to ensure CSS and JavaScript load correctly.

## 🎨 Design

### Color Scheme

The website uses a dark MTG-inspired theme:

- **Background:** Dark purple/black tones (#0f0f1e, #1a1a2e)
- **Accents:** Gold and amber (#d4af37, #ffbf00)
- **Text:** Light colors for readability
- **Borders:** Purple and gold highlights

### Typography

- Clean, modern sans-serif fonts (Segoe UI, system fonts)
- Hierarchical heading sizes
- Readable line heights and spacing

### Components

- **Cards:** Content blocks with gradients and borders
- **Tables:** Sortable data tables for standings
- **Badges:** Format badges and rank indicators
- **Buttons:** Primary (gold) and secondary (outlined) styles
- **Navigation:** Responsive navbar with mobile hamburger menu

## 🔧 JavaScript Features

### Table Sorting

Click any column header in the standings table to sort:
- Supports ascending/descending order
- Visual indicators (arrows) show current sort
- Automatically updates rank badges

### Mobile Navigation

- Hamburger menu on mobile devices
- Smooth animations
- Auto-closes when clicking links or outside menu

### Scroll Animations

- Cards fade in as you scroll
- Smooth scrolling for anchor links

## 📝 Customization

### Updating Content

**Events:** Edit `schedule.html` to add/remove events
**Players:** Edit `players.html` to add/remove player profiles
**Standings:** Edit `standings.html` to update player standings
**Rules:** Edit `rules.html` to modify league rules

### Styling

All styles are in `css/styles.css`. CSS variables at the top make it easy to change:
- Colors
- Spacing
- Border radius
- Shadows
- Transitions

### Adding Pages

1. Create new HTML file using existing pages as template
2. Copy the navigation and footer sections
3. Add link to new page in all navigation menus
4. Update the active class on the nav link

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

The site uses modern CSS features but maintains broad compatibility.

## 📱 Responsive Breakpoints

- **Desktop:** > 768px (full layout)
- **Tablet:** 481px - 768px (adjusted layout)
- **Mobile:** ≤ 480px (stacked layout, hamburger menu)

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, gradients
- **Vanilla JavaScript** - No frameworks or libraries
- **No Build Tools** - Pure static files, no compilation needed

## 📄 License

This website template is part of the Iterative-Workflow-Optimization-Strategies repository.

## 🎴 MTG Mana Symbols

The site uses text representations of mana symbols:
- W (White)
- U (Blue)
- B (Black)
- R (Red)
- G (Green)

These appear in navigation branding and player color preferences.

## 🏆 Sample Data

The website includes sample data for demonstration:
- 10 players with realistic stats
- 5 upcoming events
- 4 past events
- Multiple game formats (Standard, Modern, Pioneer, Draft, Commander)

Replace this data with your actual league information.

## 🌐 Deployment Example

### GitHub Pages

1. Push the site folder to your repository
2. Go to Settings > Pages
3. Select branch and `/site` folder
4. Save and wait for deployment

### Netlify

1. Drag and drop the `site` folder to Netlify
2. Or connect your GitHub repository
3. Set publish directory to `site`
4. Deploy

## 🔗 Links Between Pages

All pages are linked via:
- Navigation menu (all pages)
- Footer links (all pages)
- Call-to-action buttons (homepage)
- Inline links in content

## ✨ Interactive Features

1. **Sortable Standings Table** - Click headers to sort
2. **Mobile Menu** - Hamburger navigation
3. **Hover Effects** - Cards, buttons, links
4. **Scroll Animations** - Fade-in effects
5. **Active Navigation** - Current page highlighted

---

**Magic: The Gathering** is © Wizards of the Coast. This is a fan-made league website.
