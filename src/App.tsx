import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Download,
  ExternalLink,
  Code,
  Database,
  Globe,
  Bot,
  FileCode,
  Terminal,
  Cloud,
  Server,
  Shield,
  Award,
  FileText,
  Users,
  MapPin,
  Phone
} from 'lucide-react';
import './App.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const projects: Project[] = [
    {
      id: 1,
      title: "Project Pæmon - AI Web App",
      description: "A Pokémon-inspired AI web app that generates personalized digital companions based on user personality traits. Co-developed at Nosu AI Hackathon, winning Best Personal Project (CodeBuff) with $650 USD prize. Features AI-generated visuals, descriptions, and music.",
      technologies: ["Next.js", "OpenAI GPT-3.5", "Stable Diffusion", "TailwindCSS", "AI Integration", "Beatoven.ai"],
      image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/216/829/datas/original.png",
      github: "https://github.com/chanadinh",
      live: "https://project-paemon-31jm.vercel.app"
    },
    {
      id: 2,
      title: "MNIST Digit Classifier",
      description: "Machine learning project for digit recognition using the MNIST dataset. Implemented neural networks and evaluated different ML algorithms for optimal classification accuracy.",
      technologies: ["Python", "Machine Learning", "Neural Networks", "MNIST Dataset", "Classification"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      github: "https://github.com/chanadinh/MNIST-Digit-Classifier-Project",
      live: "https://github.com/chanadinh/MNIST-Digit-Classifier-Project"
    },
    {
      id: 3,
      title: "Bike Sharing Demand Prediction",
      description: "ML project using AutoGluon for automated machine learning to predict bike sharing demand. Demonstrates expertise in time series forecasting and automated ML workflows.",
      technologies: ["Python", "AutoGluon", "Machine Learning", "Time Series", "Forecasting", "Jupyter"],
      image: "https://video.udacity-data.com/topher/2021/May/60b0664a_kaggle-overview/kaggle-overview.png",
      github: "https://github.com/chanadinh/Project--Predict-Bike-Sharing-Demand-with-AutoGluon",
      live: "https://github.com/chanadinh/Project--Predict-Bike-Sharing-Demand-with-AutoGluon"
    },
    {
      id: 4,
      title: "Dog Breed Classifier",
      description: "Computer vision project using PyTorch for dog breed classification. Evaluated CNN architectures (AlexNet, VGG, ResNet) for optimal accuracy and computational efficiency.",
      technologies: ["Python", "PyTorch", "CNN", "AlexNet", "VGG", "ResNet", "Computer Vision"],
      image: "https://github.com/chanadinh/Dog-Classifier/raw/main/uploaded_images/Dog_2.jpg",
      github: "https://github.com/chanadinh/Dog-Classifier",
      live: "https://github.com/chanadinh/Dog-Classifier"
    },
    {
      id: 5,
      title: "Medusa Bot - Discord Bot",
      description: "A feature-rich Discord bot built with Node.js using multiple APIs including Flickr API and F1 data. Features REST API integration, slash commands, and event handling with 1 star on GitHub.",
      technologies: ["JavaScript", "Node.js", "Discord.js", "REST APIs", "Flickr API", "F1 Data", "Bot Development"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      github: "https://github.com/chanadinh/medusa_bot",
      live: "https://github.com/chanadinh/medusa_bot"
    }
  ];

  const skills: Skill[] = [
    { name: "Python Programming", icon: <Code className="w-6 h-6" />, level: 95 },
    { name: "Machine Learning", icon: <FileCode className="w-6 h-6" />, level: 90 },
    { name: "Mathematics & Statistics", icon: <Terminal className="w-6 h-6" />, level: 90 },
    { name: "AI Development", icon: <Database className="w-6 h-6" />, level: 88 },
    { name: "Web Development", icon: <Server className="w-6 h-6" />, level: 85 },
    { name: "Data Science", icon: <Shield className="w-6 h-6" />, level: 85 }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "AI Programming with Python Nanodegree",
      description: "Completed Udacity's comprehensive AI programming course, gaining expertise in machine learning and artificial intelligence development.",
      icon: <FileText className="w-8 h-8" />,
      date: "Udacity"
    },
    {
      id: 2,
      title: "Best Personal Project - CodeBuff ($650)",
      description: "Won Best Personal Project at Nosu AI Hackathon for Project Pæmon, a Pokémon-inspired AI web application with $650 USD prize.",
      icon: <Award className="w-8 h-8" />,
      date: "2025"
    },
    {
      id: 3,
      title: "Top 5 Individual - Programming Competition",
      description: "Represented Seminole State College in Intercollegiate Programming Competition, contributing to 1st place overall among all participating institutions.",
      icon: <Users className="w-8 h-8" />,
      date: "2025"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <img
                src="/logo.png"
                alt="Chan Dinh Logo"
                className="w-28 h-28 rounded-lg"
              />
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'projects', 'skills', 'achievements', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-300 capitalize font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:hidden"
            >
              <button className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
                <Menu className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <img
                src="https://avatars.githubusercontent.com/u/162244788?v=4"
                alt="Chan Dinh"
                className="w-32 h-32 rounded-full border-4 border-primary-100 shadow-xl"
              />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Hi, I'm <span className="gradient-text">Chan Dinh</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI/ML Developer passionate about creating innovative solutions and contributing to the open-source community. 
              Currently interning at Siemens Energy on cutting-edge AI and machine learning technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="btn-primary">
                View My Work
              </button>
              <a
                href="/Chan Dinh Resume April 2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Download Resume
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">4.00</div>
                <div className="text-gray-600">GPA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
                <div className="text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">3+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
            <p className="section-subtitle">
              I'm a dedicated AI/ML Developer passionate about creating innovative solutions
              and contributing to the open-source community. Currently interning at Siemens Energy
              on cutting-edge AI and machine learning technologies.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h3>
              <div className="space-y-6">
                <div className="card">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">AI/ML Intern</h4>
                  <p className="text-gray-600">Currently interning at Siemens Energy, working on AI and machine learning projects</p>
                </div>
                <div className="card">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Mathematics Tutor</h4>
                  <p className="text-gray-600">Part-time tutor helping students excel in mathematics and statistics</p>
                </div>
                <div className="card">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">4.00 GPA Student</h4>
                  <p className="text-gray-600">Maintaining excellent academic performance while pursuing AI/ML studies</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What I Do</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Machine Learning', 'AI Development', 'Data Science', 'Web Development', 'Mathematics', 'Statistics'].map((skill, index) => (
                  <div key={index} className="card text-center">
                    <div className="text-primary-600 mb-2">
                      {index === 0 && <Bot className="w-6 h-6 mx-auto" />}
                      {index === 1 && <Code className="w-6 h-6 mx-auto" />}
                      {index === 2 && <Database className="w-6 h-6 mx-auto" />}
                      {index === 3 && <Globe className="w-6 h-6 mx-auto" />}
                      {index === 4 && <FileCode className="w-6 h-6 mx-auto" />}
                      {index === 5 && <Terminal className="w-6 h-6 mx-auto" />}
                    </div>
                    <p className="text-gray-700 font-medium">{skill}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <p className="section-subtitle">
              Here are some of my recent projects that showcase my skills in AI/ML development and problem-solving.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group"
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
            <p className="section-subtitle">
              My expertise spans across various technologies and frameworks, with a strong focus on AI/ML development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{skill.level}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Achievements & <span className="gradient-text">Certifications</span></h2>
            <p className="section-subtitle">
              Recognition for my work and dedication in the field of AI/ML development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <div className="text-sm text-primary-600 font-medium">{achievement.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
            <p className="section-subtitle">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">chan.dinh@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">Orlando, FL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">Available for opportunities</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/chanadinh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/chan-dinh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:chan.dinh@example.com"
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container-custom text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Chan Dinh Logo"
                className="w-28 h-28 rounded-lg"
              />
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AI/ML Developer passionate about innovation and technology. Currently interning at Siemens Energy, 
              working on cutting-edge AI and machine learning solutions.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/chanadinh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/chan-dinh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:chan.dinh@example.com"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2025 Chan Dinh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
