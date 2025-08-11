import React from 'react';
import type { Task } from '../../types/Tasks';
import { useTheme } from '../../context/ThemeContext';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true } as const;
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

interface TaskInfoProps {
  task: Task;
  onClose: () => void;
}

const TaskInfo: React.FC<TaskInfoProps> = ({ task, onClose }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`
        p-6 rounded-lg shadow-xl w-full max-w-lg mx-auto transform transition-all
        ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}
      `}
    >
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-2xl font-bold">About Task</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Title:</h3>
          <p className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            {task.title}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Subtitle:</h3>
          <p className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            {task.subtitle}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Note:</h3>
          <p className={`p-3 rounded-lg h-24 overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            {task.note}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Created At:</h3>
            <p className={`p-3 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              {formatDate(task.createdAt)}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Updated At:</h3>
            <p className={`p-3 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              {formatDate(task.updatedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskInfo;
