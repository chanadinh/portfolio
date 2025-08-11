import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Code, 
  Database, 
  Globe, 
  FileCode, 
  Terminal 
} from 'lucide-react';
import SectionHeader from './SectionHeader';

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          title="About Me"
          subtitle="I'm a dedicated AI/ML Developer passionate about creating innovative solutions and contributing to the open-source community. Currently interning at Siemens Energy on cutting-edge AI and machine learning technologies."
          highlightedWord="Me"
        />
        
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
              {[
                { name: 'Machine Learning', icon: <Bot className="w-6 h-6 mx-auto" /> },
                { name: 'AI Development', icon: <Code className="w-6 h-6 mx-auto" /> },
                { name: 'Data Science', icon: <Database className="w-6 h-6 mx-auto" /> },
                { name: 'Web Development', icon: <Globe className="w-6 h-6 mx-auto" /> },
                { name: 'Mathematics', icon: <FileCode className="w-6 h-6 mx-auto" /> },
                { name: 'Statistics', icon: <Terminal className="w-6 h-6 mx-auto" /> }
              ].map((skill, index) => (
                <div key={index} className="card text-center">
                  <div className="text-primary-600 mb-2">
                    {skill.icon}
                  </div>
                  <p className="text-gray-700 font-medium">{skill.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
