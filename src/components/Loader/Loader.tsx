import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface LoaderProps {
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = '#ffffff' }) => {
  return (
    <div className="flex h-fit justify-center items-center">
      <ThreeDots
        height={24}
        width={70}
        radius={9}
        color={color}
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
