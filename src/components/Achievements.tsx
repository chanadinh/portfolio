import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data';
import SectionHeader from './SectionHeader';

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          title="Achievements & Certifications"
          subtitle="Recognition for my work and dedication in the field of AI/ML development."
          highlightedWord="Certifications"
        />
        
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
  );
};

export default Achievements;
