import React from 'react';
import { render, screen } from '@testing-library/react';
import ConnectFour from './ConnectFour';

test('renders learn react link', () => {
  render(<ConnectFour />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
