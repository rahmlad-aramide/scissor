import React from 'react';
import { render } from '@testing-library/react';
import Button, { BUTTON_WIDTH_CLASSES } from '../src/components/Button/Button';

describe('Button component', () => {
  const defaultProps = {
    children: 'Click me',
  };

  it('renders the button with default props', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();
  });

  it('renders the button with custom width class', () => {
    const { container } = render(
      <Button {...defaultProps} buttonWidth="fit" />
    );
    const buttonElement = container.firstChild as HTMLElement;
    expect(buttonElement).toHaveClass(BUTTON_WIDTH_CLASSES.fit);
  });

  it('disables the button when disabled prop is true', () => {
    const { getByText } = render(<Button {...defaultProps} disabled />);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('cursor-not-allowed');
  });

});
