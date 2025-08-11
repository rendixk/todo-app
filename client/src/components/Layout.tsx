import React, { useState, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaListAlt, FaQuestionCircle, FaSun, FaMoon, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import AccountPopup from './AccountPopup';
import LogoutConfirmationPopup from '../components/LogoutConfimationPopup'; 

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [showAccountPopup, setShowAccountPopup] = useState<boolean>(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState<boolean>(false); // State baru
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { userEmail, logout } = useAuth();
  const location = useLocation();

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleOpenAccountPopup = useCallback(() => {
    setShowAccountPopup(true);
  }, []);

  const handleCloseAccountPopup = useCallback(() => {
    setShowAccountPopup(false);
  }, []);

  const handleInitiateLogout = useCallback(() => {
    setShowAccountPopup(false);
    setShowLogoutConfirmation(true);
  }, []);

  const handleCancelLogout = useCallback(() => {
    setShowLogoutConfirmation(false); 
    setShowAccountPopup(true); 
  }, []);
  
  const handleConfirmLogout = useCallback(() => {
    logout();
    setShowLogoutConfirmation(false);
  }, [logout]);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <aside className={`fixed top-0 left-0 h-full w-64 p-6 flex flex-col transition-transform duration-300 ease-in-out z-40
        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="flex items-center mb-12">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>To-Do App</h1>
        </div>

        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <Link to="/dashboard" className={`flex items-center p-3 rounded-lg font-medium transition duration-200
                ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}
                ${location.pathname === '/dashboard' ? 'bg-blue-600 text-white' : (isDarkMode ? 'text-gray-400' : 'text-gray-800')}`}>
                <FaListAlt className="mr-3" />
                To-Do list
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/faqs" className={`flex items-center p-3 rounded-lg font-medium transition duration-200
                ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}
                ${location.pathname === '/faqs' ? 'bg-blue-600 text-white' : (isDarkMode ? 'text-gray-400' : 'text-gray-800')}`}>
                <FaQuestionCircle className="mr-3" />
                FAQs
              </Link>
            </li>
          </ul>
        </nav>

        <div className={`mt-auto p-3 rounded-lg flex items-center justify-between
          ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
          <span className="font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          <button
            onClick={toggleDarkMode}
            className={`p-1 rounded-full transition-colors duration-200
            ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <FaSun className="h-5 w-5 text-yellow-300" />
            ) : (
              <FaMoon className="h-5 w-5 text-indigo-700" />
            )}
          </button>
        </div>
      </aside>
      
      <div onClick={toggleSidebar} className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out
        ${isSidebarOpen ? 'opacity-100 block' : 'opacity-0 hidden'} lg:hidden`}
      >
      </div>

      <main className={`flex-1 transition-margin duration-300 ease-in-out lg:ml-64`}>
        <div className="p-6">
          <div className="flex justify-between items-center -mt-3 mb-4">
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-full mr-4 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} lg:hidden`}
              aria-label="Toggle sidebar"
            >
              <FaBars className="w-6 h-6" />
            </button>
            {userEmail ? (
              <button
                onClick={handleOpenAccountPopup}
                className={`p-2 rounded-full transition-colors duration-200
                  ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                aria-label="Akun"
              >
                <FaUserCircle size={40} />
              </button>
            ) : (
              <Link to="/login" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                Sign In
              </Link>
            )}
          </div>
          <Outlet />
        </div>
      </main>

      {userEmail && (
        <>
          <AccountPopup
            isOpen={showAccountPopup}
            onClose={handleCloseAccountPopup}
            userEmail={userEmail}
            onInitiateLogout={handleInitiateLogout} // Perbarui prop
          />
          <LogoutConfirmationPopup
            isOpen={showLogoutConfirmation}
            onClose={handleCancelLogout}
            onConfirm={handleConfirmLogout}
          />
        </>
      )}
    </div>
  );
};

export default Layout;
