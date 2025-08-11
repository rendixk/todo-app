import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext'; 
import DashboardLayout from './DashboardLayout';
import TaskForm from '../tasks/TaskForm';
import Modal from '../Modal';
import TaskInfo from '../tasks/TaskInfo';
import ModalConfirm from '../ModalConfirm';
import AccountPopup from '../AccountPopup';
import LogoutConfirmationPopup from '../LogoutConfimationPopup';
import type { Task, NewTaskPayload } from '../../types/Tasks';
import taskAPI from '../../api/taskAPI';

export default function DashboardContainer() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { userEmail, logout } = useAuth(); // Import fungsi 'logout'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [showingTaskInfo, setShowingTaskInfo] = useState<Task | undefined>(undefined);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [showAccountPopup, setShowAccountPopup] = useState<boolean>(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState<boolean>(false); // State baru untuk pop-up konfirmasi

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
    if (hour >= 5 && hour < 12) setGreeting('Selamat Pagi');
    else if (hour >= 12 && hour < 18) setGreeting('Selamat Siang');
    else if (hour >= 18 && hour < 22) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');
  }, [currentTime]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

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

  // Fungsi baru untuk memicu pop-up konfirmasi logout
  const handleInitiateLogout = useCallback(() => {
    setShowAccountPopup(false);
    setShowLogoutConfirmation(true);
  }, []);

  // Fungsi untuk membatalkan logout
  const handleCancelLogout = useCallback(() => {
    setShowLogoutConfirmation(false);
    setShowAccountPopup(true);
  }, []);

  // Fungsi untuk mengkonfirmasi dan melakukan logout
  const handleConfirmLogout = useCallback(() => {
    logout();
    setShowLogoutConfirmation(false);
  }, [logout]);
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  return (
    <>
      <DashboardLayout
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        greeting={greeting}
        formattedTime={formattedTime}
        userProfile={userEmail ? { email: userEmail } : null}
        tasks={tasks}
        loading={loading}
        error={error}
        onAddTaskClick={handleShowAddTaskForm}
        onToggleComplete={handleToggleComplete}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onShowTaskInfo={handleShowTaskInfo}
        onOpenAccountPopup={handleOpenAccountPopup}
      />

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
        message="Apakah Anda Yakin Ingin Menghapus Tugas Ini?"
      />
      
      {userEmail && (
        <AccountPopup
          isOpen={showAccountPopup}
          onClose={handleCloseAccountPopup}
          userEmail={userEmail}
          onInitiateLogout={handleInitiateLogout} // Tambahkan prop yang diperlukan di sini
        />
      )}
      
      {userEmail && (
        <LogoutConfirmationPopup
          isOpen={showLogoutConfirmation}
          onClose={handleCancelLogout}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  );
}
