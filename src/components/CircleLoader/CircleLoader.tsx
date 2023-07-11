import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

interface LoaderProps {
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = '#ffffff' }) => {
  return (
    <div className="flex h-fit justify-center items-center">
      <CirclesWithBar
        height={100}
        width={100}
        color={color}
        visible={true}
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

export default Loader;
