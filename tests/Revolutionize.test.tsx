import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Revolutionize from '../src/components/Revolutionize/Revolutionize';

describe('Revolutionize component', () => {
  it('renders the component with the correct content', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Revolutionize />
      </MemoryRouter>
    );

    // Assert the heading
    const headingElement = getByText('Revolutionizing Link Optimization');
    expect(headingElement).toBeInTheDocument();

    // Assert the button text
    const buttonElement = getByText('Get Started');
    expect(buttonElement).toBeInTheDocument();

    // Assert the button links to "/sign-up"
    const linkElement = buttonElement.closest('a');
    expect(linkElement).toHaveAttribute('href', '/sign-up');
  });
});
