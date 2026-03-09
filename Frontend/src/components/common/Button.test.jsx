import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';
import '@testing-library/jest-dom';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('bg-spotify-green');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });
});
