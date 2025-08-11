import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

interface AuthFormLayoutProps {
  title: string
  subtitleText: string
  children: React.ReactNode
  footerText: string
  footerLinkText: string
  footerLinkTo: string
}

export default function AuthFormLayout({
  title,
  subtitleText,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthFormLayoutProps) {
  const { isDarkMode } = useTheme()

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8
      ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
    >
      <div
        className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex flex-col items-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4
           ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}> 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white" 
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2
            className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {title}
          </h2>
          <p
            className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {subtitleText}
          </p>
        </div>

        {children}
        <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {footerText}{" "}
          <Link to={footerLinkTo} className="text-blue-500 hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}