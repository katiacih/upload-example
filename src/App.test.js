import { render, screen } from '@testing-library/react';
import App from './App';

test('Deve renderizar o componente upload', () => {
  render(<App />)
  expect(screen.getByTestId('upload')).toBeInTheDocument()
});
