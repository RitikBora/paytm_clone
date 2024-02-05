import React from 'react';
import { useEffect } from 'react';

interface ErrorPopupProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ errorMessage, onClose }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timerId);
  }, [onClose]);


  return (
    <div className="fixed bottom-8 flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-3 rounded-l relative" role="alert">
        <strong className="font-bold">{errorMessage}</strong>
        <span className="absolute top-0 bottom-0 right-2 px-0 py-3">
            <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            onClick={onClose}
            >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
        </span>
        </div>

    </div>
  );
};

export default ErrorPopup;