import { render, screen } from '@testing-library/react';
import ConnectFour from './ConnectFour.js';

test('renders learn react link', () => {
    render(<ConnectFour />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
