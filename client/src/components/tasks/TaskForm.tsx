import React, { useState, useEffect } from 'react'
import type { Task, NewTaskPayload } from '../../types/Tasks'
import { useTheme } from '../../context/ThemeContext'

interface TaskFormProps {
  initialData?: Task
  onSubmit: (data: NewTaskPayload) => void
  onBack: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onBack }) => {
  const { isDarkMode } = useTheme()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setSubtitle(initialData.subtitle)
      setNote(initialData.note)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      subtitle,
      note,
    })
  }

  return (
    <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {initialData ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium">Subtitle</label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium">Notes</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onBack}
            className={`px-4 py-2 rounded-md font-medium transition duration-200
            ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium shadow-md hover:bg-blue-700 transition duration-200"
          >
            {initialData ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm