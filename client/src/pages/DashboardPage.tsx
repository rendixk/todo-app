import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import TodoList from '../components/tasks/TodoList';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/Modal';
import TaskInfo from '../components/tasks/TaskInfo';
import ModalConfirm from '../components/ModalConfirm';
import AccountPopup from '../components/AccountPopup';
import type { Task, NewTaskPayload } from '../types/Tasks';
import type { UserProfile } from '../types/Users';
import taskAPI from '../api/taskAPI';
import { FaUserCircle } from 'react-icons/fa';

export default function DashboardPage() {
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [showingTaskInfo, setShowingTaskInfo] = useState<Task | undefined>(undefined);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [showAccountPopup, setShowAccountPopup] = useState<boolean>(false);
  const [userProfile] = useState<UserProfile | null>(null);

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTasks = await taskAPI.getAllTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) setGreeting('Good Morning');
    else if (hour >= 12 && hour < 18) setGreeting('Good Afternoon');
    else if (hour >= 18 && hour < 22) setGreeting('Good Evening');
    else setGreeting('Good Night');
  }, [currentTime]);

  const handleToggleComplete = useCallback(async (taskId: number, newIsCompleted: boolean) => {
    try {
      setTasks(prevTasks =>
        prevTasks.map(task => task.id === taskId ? { ...task, isCompleted: newIsCompleted } : task));
      await taskAPI.updateTask(taskId, { isCompleted: newIsCompleted });
    } catch (err) {
      console.error(`Failed to update task ${taskId} completion status:`, err);
      setError('Failed to update task status. Please try again.');
      setTasks(prevTasks =>
        prevTasks.map(task => task.id === taskId ? { ...task, isCompleted: !newIsCompleted } : task)
      );
    }
  }, []);

  const handleSubmitTaskForm = useCallback(async (data: NewTaskPayload) => {
    try {
      if (editingTask) {
        const updatedDataWithTimestamp = {
          ...data,
          updatedAt: new Date().toISOString(),
        };

        const updatedTask = await taskAPI.updateTask(editingTask.id, updatedDataWithTimestamp);
        if (updatedTask) {
          setTasks(prevTasks =>
            prevTasks.map(task => task.id === editingTask.id ? updatedTask : task)
          );
        } else {
          setTasks(prevTasks =>
            prevTasks.map(task =>
              task.id === editingTask.id ? { ...editingTask, ...updatedDataWithTimestamp } : task
            )
          );
          setError(null);
        }
      } else {
        const newTask = await taskAPI.createTask(data);
        setTasks(prevTasks => [...prevTasks, newTask]);
      }
      setShowTaskForm(false);
      setEditingTask(undefined);
    } catch (err) {
      console.error('Failed to submit task form:', err);
      setError('Failed to save task. Please try again.');
    }
  }, [editingTask]);

  const handleEditTask = useCallback((taskToEdit: Task) => {
    setEditingTask(taskToEdit);
    setShowTaskForm(true);
  }, []);

  const handleDeleteTask = useCallback((taskId: number) => {
    setTaskToDelete(taskId);
    setShowConfirmModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (taskToDelete === null) return;
    try {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete));
      await taskAPI.deleteTask(taskToDelete);
      setTaskToDelete(null);
      setShowConfirmModal(false);
    } catch (err) {
      console.error(`Failed to delete task ${taskToDelete}:`, err);
      setError('Failed to delete task. Please try again.');
      setTaskToDelete(null);
      setShowConfirmModal(false);
    }
  }, [taskToDelete]);

  const handleCloseConfirmModal = useCallback(() => {
    setTaskToDelete(null);
    setShowConfirmModal(false);
  }, []);

  const handleShowAddTaskForm = useCallback(() => {
    setEditingTask(undefined);
    setShowTaskForm(true);
  }, []);

  const handleCloseTaskForm = useCallback(() => {
    setEditingTask(undefined);
    setShowTaskForm(false);
  }, []);

  const handleShowTaskInfo = useCallback((taskToShow: Task) => {
    setShowingTaskInfo(taskToShow);
  }, []);

  const handleCloseTaskInfo = useCallback(() => {
    setShowingTaskInfo(undefined);
  }, []);

  const handleOpenAccountPopup = useCallback(() => {
    setShowAccountPopup(true);
  }, []);

  const handleCloseAccountPopup = useCallback(() => {
    setShowAccountPopup(false);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mt-3 mb-4">
        <div className="flex items-center space-x-2">
          {userProfile && (
            <button
              onClick={handleOpenAccountPopup}
              className={`p-2 rounded-full transition-colors duration-200
                ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <FaUserCircle size={40} />
            </button>
          )}
        </div>
        <p className="text-xl font-bold text-white">
          {greeting}: {formattedTime}
        </p>
      </header>

      <section className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Tasks</h2>
          <button
            onClick={handleShowAddTaskForm}
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
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onShowInfo={handleShowTaskInfo}
          />
        )}
      </section>

      <Modal isOpen={showTaskForm} onClose={handleCloseTaskForm} isDarkMode={isDarkMode}>
        <TaskForm
          initialData={editingTask}
          onSubmit={handleSubmitTaskForm}
          onBack={handleCloseTaskForm}
        />
      </Modal>

      <Modal isOpen={!!showingTaskInfo} onClose={handleCloseTaskInfo} isDarkMode={isDarkMode}>
        {showingTaskInfo && (
          <TaskInfo task={showingTaskInfo} onClose={handleCloseTaskInfo} />
        )}
      </Modal>

      <ModalConfirm
        isOpen={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
        message="Are You Sure Want to Delete This Task?"
      />

      {userProfile && (
        <AccountPopup
          isOpen={showAccountPopup}
          onClose={handleCloseAccountPopup}
          userEmail={userProfile.email}
          onInitiateLogout={() => {
            console.log('Logout initiated');
          }}
        />
      )}
    </div>
  );
}
