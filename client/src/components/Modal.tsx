import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  isDarkMode: boolean
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const { isDarkMode } = useTheme()
  const [shouldRender, setShouldRender] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    let enterTimeoutId: NodeJS.Timeout
    let exitTimeoutId: NodeJS.Timeout

    if (isOpen) {
      setShouldRender(true)
      enterTimeoutId = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false)
      exitTimeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 300)
    }

    return () => {
      clearTimeout(enterTimeoutId)
      clearTimeout(exitTimeoutId)
    };
  }, [isOpen]);

  if (!shouldRender) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div
        className={`fixed inset-0 backdrop-blur-sm transition-opacity duration-300 ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-gray-200 bg-opacity-60'}
        ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`relative z-50 w-full max-w-lg mx-auto rounded-lg shadow-xl transform transition-all duration-300
       ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
       ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
}