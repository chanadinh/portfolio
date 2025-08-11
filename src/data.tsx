import { Project, Skill, Achievement } from './types';
import { 
  Code,
  FileCode,
  Terminal,
  Database,
  Server,
  Shield,
  FileText,
  Award,
  Users
} from 'lucide-react';

export const projects: Project[] = [
  {
    id: 1,
    title: "Project Pæmon - AI Web App",
    description: "A Pokémon-inspired AI web app that generates personalized digital companions based on user personality traits. Co-developed at Nosu AI Hackathon, winning Best Personal Project (CodeBuff) with $650 USD prize. Features AI-generated visuals, descriptions, and music.",
    technologies: ["Next.js", "OpenAI GPT-5", "Stable Diffusion", "TailwindCSS", "AI Integration", "Beatoven.ai"],
    image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/216/829/datas/original.png",
    github: "https://github.com/chanadinh",
    live: "https://project-paemon-31jm.vercel.app"
  },
  {
    id: 2,
    title: "MNIST Digit Classifier",
    description: "Machine learning project for digit recognition using the MNIST dataset. Implemented neural networks and evaluated different ML algorithms for optimal classification accuracy.",
    technologies: ["Python", "Machine Learning", "Neural Networks", "MNIST Dataset", "Classification"],
    image: "/digit.png",
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
    image: "/medusabot.png",
    github: "https://github.com/chanadinh/medusa_bot",
    live: "https://github.com/chanadinh/medusa_bot"
  }
];

export const skills: Skill[] = [
  { name: "Python Programming", icon: <Code className="w-6 h-6" />, level: 95 },
  { name: "Machine Learning", icon: <FileCode className="w-6 h-6" />, level: 90 },
  { name: "Mathematics & Statistics", icon: <Terminal className="w-6 h-6" />, level: 90 },
  { name: "AI Development", icon: <Database className="w-6 h-6" />, level: 88 },
  { name: "Web Development", icon: <Server className="w-6 h-6" />, level: 85 },
  { name: "Data Science", icon: <Shield className="w-6 h-6" />, level: 85 }
];

export const achievements: Achievement[] = [
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
