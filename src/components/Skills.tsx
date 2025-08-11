import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data';
import SectionHeader from './SectionHeader';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Technical Skills"
          subtitle="My expertise spans across various technologies and frameworks, with a strong focus on AI/ML development."
          highlightedWord="Skills"
        />
        
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
  );
};

export default Skills;
