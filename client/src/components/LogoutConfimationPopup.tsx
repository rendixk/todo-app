import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

interface LogoutConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void; // Aksi untuk membatalkan dan kembali
  onConfirm: () => void; // Aksi untuk mengkonfirmasi logout
}

const LogoutConfirmationPopup: React.FC<LogoutConfirmationPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  const { isDarkMode } = useTheme(); // Gunakan useTheme hook

  // Animasi masuk dan keluar
  const popupClasses = `
    fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4
    transition-opacity duration-300 ease-in-out
    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  `;

  const cardClasses = `
    ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg w-full max-w-sm p-6 relative text-center
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'scale-100' : 'scale-95'}
  `;

  return (
    <div className={popupClasses}>
      <div className={cardClasses}>
        <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Konfirmasi Keluar</h2>
        <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Are you sure want to Log Out?
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Yes, Log Out
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationPopup;
