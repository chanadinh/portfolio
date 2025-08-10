# Modern Portfolio Website

A beautiful, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, modern design, and mobile-first responsive layout.

## 🚀 Features

- **Modern Design**: Clean, professional design with beautiful gradients and shadows
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **TypeScript**: Full TypeScript support for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Interactive Navigation**: Smooth scrolling navigation with active section highlighting
- **Contact Form**: Functional contact form for potential clients
- **Project Showcase**: Beautiful project cards with technology tags
- **Skills Visualization**: Animated skill bars with icons
- **Social Links**: Integration with GitHub, LinkedIn, and email

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### Personal Information

Update the following sections in `src/App.tsx`:

#### Hero Section
```tsx
<h1 className="text-5xl lg:text-6xl font-bold text-dark-900 mb-6">
  Hi, I'm <span className="text-primary-600">Your Name</span>
</h1>
<p className="text-xl text-dark-600 mb-8 leading-relaxed">
  A passionate Full-Stack Developer with expertise in creating beautiful, 
  functional, and user-centered digital experiences. I love turning ideas 
  into reality through code.
</p>
```

#### Profile Image
Replace the placeholder "YN" initials with your actual profile image:
```tsx
<div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
  {/* Replace this div with your image */}
  <img 
    src="/path-to-your-image.jpg" 
    alt="Your Name" 
    className="w-full h-full object-cover rounded-full"
  />
</div>
```

#### About Section
Update the experience and project counts:
```tsx
<div className="flex items-start space-x-4">
  <div className="w-3 h-3 bg-primary-600 rounded-full mt-2"></div>
  <div>
    <h4 className="font-medium text-dark-900">5+ Years Experience</h4>
    <p className="text-dark-600">Building web and mobile applications</p>
  </div>
</div>
```

### Projects

Update the `projects` array with your actual projects:

```tsx
const projects: Project[] = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Description of your project",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "/path-to-project-image.jpg",
    github: "https://github.com/yourusername/project",
    live: "https://your-project.com"
  },
  // Add more projects...
];
```

### Skills

Customize the `skills` array with your actual skills and proficiency levels:

```tsx
const skills: Skill[] = [
  { name: "Frontend Development", icon: <Code className="w-6 h-6" />, level: 90 },
  { name: "UI/UX Design", icon: <Palette className="w-6 h-6" />, level: 85 },
  // Add more skills...
];
```

### Contact Information

Update your contact details:

```tsx
<div className="flex items-center space-x-4">
  <div className="p-3 bg-primary-100 rounded-xl text-primary-600">
    <Mail className="w-6 h-6" />
  </div>
  <div>
    <h4 className="font-medium text-dark-900">Email</h4>
    <p className="text-dark-600">your.actual.email@example.com</p>
  </div>
</div>
```

### Colors and Theme

Customize the color scheme in `tailwind.config.js`:

```js
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... customize these colors
  },
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    // ... customize these colors
  }
}
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎭 Animations

All animations are powered by Framer Motion:
- **Fade In**: Elements fade in on page load
- **Slide Up**: Elements slide up when scrolling into view
- **Hover Effects**: Interactive hover animations on buttons and cards
- **Smooth Scrolling**: Smooth navigation between sections

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect React settings
3. Deploy with one click

### GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/portfolio"` to package.json
2. Install gh-pages: `npm install -D gh-pages`
3. Add scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Deploy: `npm run deploy`

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### File Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Custom styles
├── index.tsx        # Application entry point
└── index.css        # Global styles and Tailwind imports
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing your portfolio, please open an issue on GitHub.

---

**Happy coding! 🎉**
