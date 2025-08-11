import React from 'react'
import TaskForm from '../components/tasks/TaskForm'
import type { Task, NewTaskPayload } from '../types/Tasks'

interface AddTaskPageProps {
  editingTask?: Task
  onAddTask: (taskData: NewTaskPayload) => void
  onUpdateTask: (taskId: number, taskData: NewTaskPayload) => void
  onBack: () => void
}

const AddTaskPage: React.FC<AddTaskPageProps> = ({ editingTask, onAddTask, onUpdateTask, onBack }) => {
  const isEditing = !!editingTask

  const handleSubmit = (data: NewTaskPayload) => {
    if (isEditing && editingTask) {
      onUpdateTask(editingTask.id, data)
    } else {
      onAddTask(data)
    }
  }
  return (
    <TaskForm
      initialData={editingTask}
      onSubmit={handleSubmit}
      onBack={onBack}
    />
  )
}

export default AddTaskPage