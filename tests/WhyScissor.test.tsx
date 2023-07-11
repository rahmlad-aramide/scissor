import React from 'react';
import { render } from '@testing-library/react';
import WhyScissor from '../src/components/WhyScissor/WhyScissor';
import { whyData } from '../src/utils/whyData/whyData';

describe('WhyScissor component', () => {
  it('renders the component with the correct content', () => {
    const { getByTestId } = render(<WhyScissor />);

    // Assert the heading
    const headingElement = getByTestId('why-heading');
    expect(headingElement).toBeInTheDocument();

    // Assert the paragraph content
    const paragraphElement = getByTestId('why-paragraph');
    expect(paragraphElement).toBeInTheDocument();

    // Assert each reason's heading and body
    whyData.forEach((data, index) => {
      const reasonHeading = getByTestId(`reason-heading-${index}`);
      const reasonBody = getByTestId(`reason-body-${index}`);
      expect(reasonHeading).toBeInTheDocument();
      expect(reasonBody).toBeInTheDocument();
    });
  });
});
