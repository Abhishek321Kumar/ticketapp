import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ticket form heading', () => {
  render(<App />);
  expect(screen.getByText(/form/i)).toBeInTheDocument();
});
