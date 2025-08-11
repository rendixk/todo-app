import React from 'react';
import type { Task } from '../../types/Tasks';
import TodoItemContainer from './TodoItemContainer';

interface TodoListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number, isCompleted: boolean) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void
  onShowInfo: (task: Task) => void
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onShowInfo,
}) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400 text-lg py-10">No tasks found. Add a new task to get started!</p>
      ) : (
        tasks.map(task => (
          <TodoItemContainer
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            onShowInfo={onShowInfo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
