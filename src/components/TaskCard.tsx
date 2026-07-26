import React from 'react';
import type { Task, Status } from '../types/task.ts';

// 1. Props interface define kar rahe hain
interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: Status) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onStatusChange }) => {

  // Priority ke hisab se badge ka color select karne ke liye helper function
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">

      {/* Header: Title & Priority Badge */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium capitalize ${getPriorityColor()}`}>
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>

      {/* Footer: Status Select & Delete Button */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">

        {/* Status Dropdown */}
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Status)}
          className="text-[11px] bg-gray-50 border border-gray-300 text-gray-700 rounded-md px-2 py-1 h-8 max-w-32.5 sm:max-w-none text-ellipsis overflow-hidden focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>

    </div>
  );
};