import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

export const BUTTON_WIDTH_CLASSES = {
  full: 'w-full',
  fit: 'w-fit',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  buttonWidth?: keyof typeof BUTTON_WIDTH_CLASSES;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  buttonWidth,
  disabled,
  ...otherProps
}) => {
  return (
    <button
      disabled={disabled}
      className={
        disabled
          ? `group cursor-not-allowed rounded-full py-2 px-8 bg-primary border border-primary text-white font-medium transition duration-300 ${
              BUTTON_WIDTH_CLASSES[buttonWidth || 'full']
            }`
          : `group rounded-full py-2 px-8 bg-primary border border-primary text-white font-medium transition duration-300 hover:text-primary hover:bg-transparent active:scale-90 ${
              BUTTON_WIDTH_CLASSES[buttonWidth || 'full']
            }`
      }
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
