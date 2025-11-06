import axios from 'axios'
import type { Task, NewTaskPayload } from '../types/Tasks'

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL_API}/tasks`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  if(!token) {
    throw new Error('No authentication token found')
  }
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE_URL}`, getAuthHeaders())
  return response.data.tasks
}
  
export const createTask = async (data: NewTaskPayload): Promise<Task> => {
  const response = await axios.post(`${API_BASE_URL}/create`, data, getAuthHeaders())
  return response.data.task
}
  
export const updateTask = async (taskId: number, data: Partial<Task>): Promise<Task> => {
  const response = await axios.put(`${API_BASE_URL}/${taskId}`, data, getAuthHeaders())
  return response.data
}
  
export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${taskId}`, getAuthHeaders())
}
  
const taskAPI = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
}

export default taskAPI