import React from 'react';

const Plus: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      width="6"
      height="48"
      viewBox="0 0 6 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 0V48" stroke="url(#paint0_linear_124_793)" strokeWidth="5" />
      <defs>
        <linearGradient
          id="paint0_linear_124_793"
          x1="3.05"
          y1="0"
          x2="3.05"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#112232" />
          <stop offset="1" stopColor="#4D6B88" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Plus;
