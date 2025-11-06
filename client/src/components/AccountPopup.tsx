import React from 'react';
import { FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

interface AccountPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  onInitiateLogout: () => void;
}

const AccountPopup: React.FC<AccountPopupProps> = ({ isOpen, onClose, userEmail, onInitiateLogout }) => {
  const { isDarkMode } = useTheme(); // Gunakan useTheme hook

  // Animasi masuk dan keluar
  const popupClasses = `
    fixed inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-sky-50'} bg-opacity-50 z-50 flex items-center justify-center p-4
    transition-opacity duration-300 ease-in-out
    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  `;

  const cardClasses = `
    ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg w-full max-w-sm p-6 relative
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'scale-100' : 'scale-95'}
  `;

  return (
    <div className={popupClasses}>
      <div className={cardClasses}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200
            ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
          aria-label="Tutup"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Account</h2>
          <p className={`text-sm break-words mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Log in as <br />
            <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{userEmail}</span>
          </p>
          <button
            onClick={onInitiateLogout}
            className="w-full flex items-center justify-center px-4 py-2 mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPopup;
