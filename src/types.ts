import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
