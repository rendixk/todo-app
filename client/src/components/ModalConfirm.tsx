import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ isOpen, onClose, onConfirm, message }) => {
  const { isDarkMode } = useTheme();
  // <--- Tambahkan state untuk animasi
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let enterTimeoutId: NodeJS.Timeout;
    let exitTimeoutId: NodeJS.Timeout;

    if (isOpen) {
      setShouldRender(true);
      enterTimeoutId = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
      exitTimeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }

    return () => {
      clearTimeout(enterTimeoutId);
      clearTimeout(exitTimeoutId);
    };
  }, [isOpen]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-gray-200 bg-opacity-60'}
          ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`
          relative z-50 p-8 rounded-lg shadow-xl w-full max-w-lg mx-auto transform transition-all duration-300
          ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
          ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* <--- Mengubah tata letak agar tulisan di tengah dan menghapus tombol panah */}
        <div className="flex flex-col items-center justify-center mb-6 mt-4">
          <h2 className="text-2xl font-bold text-center">{message}</h2>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition duration-200"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-green-500 border border-green-500 hover:bg-green-500 hover:text-white transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
