import React, { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  py?: string;
  otherProps?: any;
}

const Input: React.FC<InputProps> = ({ py, ...otherProps }) => {
  return (
    <input
      style={{ paddingTop: py, paddingBottom: py }}
      className={`border border-[#3284FF] outline-none text-[#3284ff] placeholder:text-[#3284ff]/70 rounded-lg px-6 text-xs font-medium w-full`}
      {...otherProps}
    />
  );
};
export default Input;
