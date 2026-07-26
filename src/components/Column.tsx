import React from 'react';
import type { Task, Status } from '../types/task';
import { TaskCard } from './TaskCard';

// Props Interface
interface ColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, newStatus: Status) => void;
}

export const Column: React.FC<ColumnProps> = ({
  title,
  status,
  tasks,
  onDeleteTask,
  onStatusChange,
}) => {
  // Column status ke hisab se specific status wale tasks ko filter kar rahe hain
  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="bg-gray-100 p-4 rounded-xl flex flex-col h-full min-h-30">
      
      {/* Column Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h2 className="font-bold text-gray-700 text-base uppercase tracking-wide">
          {title}
        </h2>
        
        {/* Task Counter Badge */}
        <span className="bg-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full font-semibold">
          {columnTasks.length}
        </span>
      </div>

      {/* Tasks List Zone */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {columnTasks.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
            No tasks in {title.toLowerCase()}
          </div>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>

    </div>
  );
};