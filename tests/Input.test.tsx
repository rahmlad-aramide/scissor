import React from 'react';
import { render } from '@testing-library/react';
import Input from '../src/components/Input/Input';

describe('Input component', () => {
  const defaultProps = {
    placeholder: 'Enter text',
  };

  it('renders the input with default props', () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    const inputElement = getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('applies the paddingTop and paddingBottom styles', () => {
    const { getByPlaceholderText } = render(
      <Input {...defaultProps} py="10px" />
    );
    const inputElement = getByPlaceholderText('Enter text');
    expect(inputElement).toHaveStyle('paddingTop: 10px');
    expect(inputElement).toHaveStyle('paddingBottom: 10px');
  });

});
