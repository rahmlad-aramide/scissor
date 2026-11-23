import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  py?: string;
  otherProps?: any;
}

/**
 * `min-w-0` + `max-w-full` let the field shrink inside flex/grid cells
 * (an <input> otherwise has an intrinsic min-width and overflows its
 * container when two sit side by side). Padding scales down on small screens.
 */
const Input: React.FC<InputProps> = ({
  py,
  className = '',
  style,
  otherProps: _otherProps,
  ...rest
}) => {
  return (
    <input
      style={{ paddingTop: py, paddingBottom: py, ...style }}
      className={`box-border w-full min-w-0 max-w-full appearance-none rounded-lg border border-[#3284FF] bg-white px-4 text-xs font-medium text-[#3284ff] outline-none transition placeholder:text-[#3284ff]/70 focus:ring-2 focus:ring-primary/20 sm:px-6 ${className}`}
      {...rest}
    />
  );
};
export default Input;
