import { useTheme } from '../../context/ThemeContext';
import type { Task } from '../../types/Tasks';
import { FaTrash, FaPencilAlt, FaEllipsisV } from 'react-icons/fa';

interface TodoItemProps {
  task: Task;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onShowInfo: (task: Task) => void;
}

export default function TodoItem({ task, onToggleComplete, onEdit, onDelete, onShowInfo }: TodoItemProps) {
  const { isDarkMode } = useTheme();

  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.isCompleted);
  };

  return (
    <div
      className={`
        flex items-center justify-between p-4 mb-2 rounded-lg shadow-md transition-colors duration-200
        ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}
      `}
    >
      <div className="flex-1">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleToggleComplete}
            className="mr-4 h-5 w-5 text-blue-600 rounded"
          />
          <div className="flex flex-col">
            <span
              className={`font-semibold text-lg ${task.isCompleted ? 'line-through text-gray-500' : ''}`}
            >
              {task.title}
            </span>
            <span
              className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {task.subtitle}
            </span>
          </div>
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onShowInfo(task)}
          className={`p-2 rounded-full transition duration-200
            ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          <FaEllipsisV />
        </button>
        <button
          onClick={() => onEdit(task)}
          className={`p-2 rounded-full hover:bg-gray-700 transition duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className={`p-2 rounded-full hover:bg-red-500 transition duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-white'}`}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
