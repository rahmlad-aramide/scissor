// eslint-disable-next-line react-refresh/only-export-components
export const BUTTON_WIDTH_CLASSES = {
  full: 'w-full',
  fit: 'w-fit',
};
const Button = ({ children, buttonWidth, ...otherProps }) => {
  return (
    <button
      className={`group rounded-full py-2 px-8 bg-primary border border-primary text-white font-medium transition duration-300 hover:text-primary hover:bg-transparent active:scale-90 ${BUTTON_WIDTH_CLASSES[buttonWidth]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
export default Button;
