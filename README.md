# 🚀 Chan Dinh - AI/ML Developer Portfolio

A modern, responsive portfolio website showcasing my expertise in Machine Learning, Artificial Intelligence, and Software Development.

## ✨ Features

- **Modern Design**: Clean white theme with blue accents
- **Responsive Layout**: Optimized for all devices
- **Interactive Elements**: Smooth animations and transitions
- **Project Showcase**: Featured ML/AI projects with live links
- **Professional Branding**: Personal logo and custom styling
- **Resume Download**: Direct access to professional resume

## 🛠️ Technologies Used

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## 🎯 Featured Projects

1. **Project Pæmon - AI Web App**
   - Pokémon-inspired AI companion generator
   - Won Best Personal Project at Nosu AI Hackathon ($650)
   - Technologies: Next.js, OpenAI GPT-3.5, Stable Diffusion

2. **MNIST Digit Classifier**
   - Machine learning for digit recognition
   - Neural network implementation and evaluation
   - Technologies: Python, Machine Learning, Neural Networks

3. **Bike Sharing Demand Prediction**
   - Automated ML using AutoGluon
   - Time series forecasting expertise
   - Technologies: Python, AutoGluon, Time Series

4. **Dog Breed Classifier**
   - Computer vision with PyTorch
   - CNN architecture evaluation
   - Technologies: Python, PyTorch, Computer Vision

5. **Medusa Bot - Discord Bot**
   - Multi-API Discord bot
   - REST API integration and event handling
   - Technologies: JavaScript, Node.js, Discord.js

## 🔑 API Keys Configuration

### Environment Variables
Create a `.env` file in the root directory with your API keys:

```bash
# OpenAI API Key for Medusa Chat
# Get your key from: https://platform.openai.com/api-keys
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Desmos API Key for Interactive Graphing Calculator
# Get your key by emailing: partnerships@desmos.com
REACT_APP_DESMOS_API_KEY=your_desmos_api_key_here
```

### API Key Setup

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env` file as `REACT_APP_OPENAI_API_KEY`

#### Desmos API Key
1. Email [partnerships@desmos.com](mailto:partnerships@desmos.com)
2. Request access to the Desmos API
3. Add your API key to `.env` as `REACT_APP_DESMOS_API_KEY`

### Development vs Production
- **Development**: Uses demo keys if environment variables are not set
- **Production**: Always use your own API keys for security and rate limits
- **Vercel**: Set environment variables in the Vercel dashboard for production deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/chanadinh/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🌐 Deployment

### GitHub Pages
This portfolio is automatically deployed to GitHub Pages using GitHub Actions.

**Live URL**: [https://chandinh.org](https://chandinh.org)

### Automatic Deployment
- Push to `main` branch triggers automatic build and deployment
- GitHub Actions handles the build process
- Updates are live within minutes

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── logo.png           # Personal logo
│   ├── favicon files      # Browser tab icons
│   └── resume.pdf         # Professional resume
├── src/                   # Source code
│   ├── App.tsx           # Main portfolio component
│   ├── App.css           # Custom styles and animations
│   └── index.css         # Tailwind CSS imports
├── .github/workflows/     # GitHub Actions deployment
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Colors and Theme
- Primary: Blue (#3b82f6)
- Background: White with subtle patterns
- Accents: Blue gradients and shadows

### Adding New Projects
Edit `src/App.tsx` and add new projects to the `projects` array:

```typescript
{
  id: 6,
  title: "Your New Project",
  description: "Project description here",
  technologies: ["Tech1", "Tech2"],
  image: "image-url",
  github: "github-url",
  live: "live-url"
}
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Responsive grid layouts
- **Desktop**: Full-featured experience with hover effects

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Quality
- ESLint configuration for code standards
- TypeScript for type safety
- Prettier for code formatting

## 📞 Contact

- **GitHub**: [@chanadinh](https://github.com/chanadinh)
- **LinkedIn**: [Chan Dinh](https://linkedin.com/in/chan-dinh/)
- **Email**: andinhc254@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

---

⭐ **Star this repository if you found it helpful!**
