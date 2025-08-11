import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
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
  Phone,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Project One',
      description: 'Description for project one.',
      technologies: ['React', 'TypeScript', 'Node.js'],
      image: 'project-one.jpg',
      github: 'https://github.com/user/project-one',
      live: 'https://project-one.com'
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Description for project two.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: 'project-two.jpg',
      github: 'https://github.com/user/project-two',
      live: 'https://project-two.com'
    }
  ];

  const skills: Skill[] = [
    { name: 'JavaScript', icon: <Code />, level: 90 },
    { name: 'TypeScript', icon: <FileCode />, level: 80 },
    { name: 'React', icon: <Globe />, level: 85 },
    { name: 'Node.js', icon: <Server />, level: 75 }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Achievement One',
      description: 'Description of achievement one.',
      icon: <Award />,
      date: '2023-01-01'
    },
    {
      id: 2,
      title: 'Achievement Two',
      description: 'Description of achievement two.',
      icon: <Shield />,
      date: '2023-02-01'
    }
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    handleCloseMenu();
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current!, 'YOUR_PUBLIC_KEY');
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Update active section based on scroll position
      // ...existing logic...
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">My Portfolio</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link to="/projects" className="hover:text-gray-400">
              Projects
            </Link>
            <Link to="/skills" className="hover:text-gray-400">
              Skills
            </Link>
            <Link to="/achievements" className="hover:text-gray-400">
              Achievements
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-2">
            <Link
              to="/"
              onClick={() => handleSectionClick('home')}
              className="block py-2 hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => handleSectionClick('about')}
              className="block py-2 hover:bg-gray-700"
            >
              About
            </Link>
            <Link
              to="/projects"
              onClick={() => handleSectionClick('projects')}
              className="block py-2 hover:bg-gray-700"
            >
              Projects
            </Link>
            <Link
              to="/skills"
              onClick={() => handleSectionClick('skills')}
              className="block py-2 hover:bg-gray-700"
            >
              Skills
            </Link>
            <Link
              to="/achievements"
              onClick={() => handleSectionClick('achievements')}
              className="block py-2 hover:bg-gray-700"
            >
              Achievements
            </Link>
            <Link
              to="/contact"
              onClick={() => handleSectionClick('contact')}
              className="block py-2 hover:bg-gray-700"
            >
              Contact
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(hero-image.jpg)' }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              Hi, I'm [Your Name]
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              I'm a [Your Profession] specializing in [Your Specialization].
            </p>
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">About Me</h2>
            <p className="text-lg text-gray-700">
              A brief introduction about yourself goes here. You can mention your background, experience, and what you do.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/2 mb-8">
              <h3 className="text-2xl font-bold mb-4">My Background</h3>
              <p className="text-gray-700">
                Detailed information about your background, education, and experience.
              </p>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">What I Do</h3>
              <p className="text-gray-700">
                Information about your skills, expertise, and the services you offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">My Projects</h2>
            <p className="text-lg text-gray-700">
              A showcase of my recent projects. Click on the links to view the live demos and GitHub repositories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View on GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">My Skills</h2>
            <p className="text-lg text-gray-700">
              A list of my technical skills and proficiencies.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="text-center">
                <div className="text-4xl mb-2">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-1">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Achievements</h2>
            <p className="text-lg text-gray-700">
              Recognition and awards for my work and contributions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                <div className="text-4xl mr-4">{achievement.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{achievement.title}</h3>
                  <p className="text-gray-700 mb-2">{achievement.description}</p>
                  <span className="text-gray-500 text-sm">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Contact Me</h2>
            <p className="text-lg text-gray-700">
              Feel free to reach out for collaborations or just a friendly hello!
            </p>
          </div>
          <form ref={formRef} onSubmit={handleContactSubmit} className="max-w-xl mx-auto">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-lg"
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <div className="text-green-600 mt-4">Message sent successfully!</div>
            )}
            {submitStatus === 'error' && (
              <div className="text-red-600 mt-4">Failed to send message. Please try again.</div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="font-bold">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</span>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <Github />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <Linkedin />
            </a>
            <a href="mailto:your@email.com" className="hover:text-gray-400">
              <Mail />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
