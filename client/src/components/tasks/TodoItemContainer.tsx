import React from 'react'
import type { Task } from '../../types/Tasks'
import TodoItem from './TodoItem'

interface TodoItemContainerProps {
  task: Task
  onToggleComplete: (taskId: number, isCompleted: boolean) => Promise<void>
  onEdit: (task: Task) => void
  onDelete: (taskId: number) => void
  onShowInfo: (task: Task) => void
}

const TodoItemContainer: React.FC<TodoItemContainerProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onShowInfo
}) => {
  const handleToggle = async () => {
    await onToggleComplete(task.id, !task.isCompleted)
  }

  const handleEdit = () => {
    onEdit(task)
  }

  const handleDelete = async () => {
    await onDelete(task.id)
  }

  return (
    <TodoItem
      task={task}
      onToggleComplete={handleToggle}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onShowInfo={onShowInfo}
    />
  )
}

export default TodoItemContainer