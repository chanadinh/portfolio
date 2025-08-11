import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the components to avoid complex dependencies
jest.mock('./components/MedusaChat', () => () => <div data-testid="medusa-chat">MedusaChat Component</div>);
jest.mock('./components/Portfolio', () => () => <div data-testid="portfolio">Portfolio Component</div>);

import App from './App';

test('renders without crashing', () => {
  render(<App />);
  expect(document.body).toBeInTheDocument();
});

test('renders router components', () => {
  render(<App />);
  expect(screen.getByTestId('router')).toBeInTheDocument();
  expect(screen.getByTestId('routes')).toBeInTheDocument();
});

test('renders portfolio component by default', () => {
  render(<App />);
  expect(screen.getByTestId('portfolio')).toBeInTheDocument();
});
