import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaListAlt, FaQuestionCircle, FaSun, FaMoon, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'
import TodoList from '../tasks/TodoList'
import type { Task } from '../../types/Tasks'
import type { UserProfile } from '../../types/Users'

interface DashboardLayoutProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
  greeting: string
  formattedTime: string
  userProfile: UserProfile | null
  tasks: Task[]
  loading: boolean
  error: string | null
  onAddTaskClick: () => void
  onToggleComplete: (taskId: number, isCompleted: boolean) => Promise<void>
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: number) => void
  onShowTaskInfo: (task: Task) => void
  onOpenAccountPopup: () => void 
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  isDarkMode,
  toggleDarkMode,
  isSidebarOpen,
  toggleSidebar,
  greeting,
  formattedTime,
  userProfile,
  tasks,
  loading,
  error,
  onAddTaskClick,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onShowTaskInfo,
  onOpenAccountPopup,
}) => {
  const location = useLocation()

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 p-6 flex flex-col transition-transform duration-300 ease-in-out z-40
        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        
        {/* Close button for mobile */}
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
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className={`lg:hidden p-2 rounded-full mr-4 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                aria-label="Toggle sidebar"
              >
                <FaBars className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                {userProfile && (
                  <button
                    onClick={onOpenAccountPopup}
                    className={`p-2 rounded-full transition-colors duration-200
                      ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    <FaUserCircle size={40} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-xl font-bold text-white">
              {greeting}: {formattedTime}
            </p>
          </header>

          <section className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Tasks</h2>
              <button
                onClick={onAddTaskClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              >
                Add New Task
              </button>
            </div>
            
            {loading && <p className="text-center text-gray-400">Loading tasks...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
              <TodoList
                tasks={tasks}
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onShowInfo={onShowTaskInfo}
              /> 
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
export default DashboardLayout;
