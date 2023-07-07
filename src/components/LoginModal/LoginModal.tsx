import React from 'react';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-50 w-[90%] max-w-[30rem]">
        <h2 className="text-3xl mb-4 text-center text-primary font-bold">
          Login Required
        </h2>
        <p className="text-gray-700 text-center text-lg">
          You need to be logged in before you can perform that operation.
        </p>
        <div className="flex justify-around">
          <Link to="/login">
            <button className="mt-6 rounded-full border border-primary bg-primary hover:text-primary hover:bg-transparent active:scale-90 font-medium text-white py-2 px-8 transition duration-300">
              Login
            </button>
          </Link>
          <button
            className="mt-6 rounded-full border border-primary bg-primary hover:text-primary hover:bg-transparent active:scale-90 font-medium text-white py-2 px-8 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
