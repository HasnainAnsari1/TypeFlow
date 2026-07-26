import { useState } from 'react';
import type { Task, CreateTaskInput, Status, Priority } from './types/task';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { Column } from './components/Column';
import { TaskModal } from './components/TaskModal';

export default function App() {
  // 1. LocalStorage Hook for Tasks State Management
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow_tasks', []);

  // 2. Local States for UI Controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');

  // 3. Add Task Handler
  const handleAddTask = (taskInput: CreateTaskInput) => {
    const newTask: Task = {
      ...taskInput,
      id: crypto.randomUUID(), // Browser's built-in unique ID generator
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
  };

  // 4. Delete Task Handler
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 5. Change Task Status Handler
  const handleStatusChange = (id: string, newStatus: Status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // 6. Filtered Tasks Calculation (Search + Priority Filter)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      selectedPriority === 'all' || task.priority === selectedPriority;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Header Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Logo / Title */}
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded-lg text-xl">TF</span>
              TypeFlow
            </h1>
            {/* <p className="text-xs text-gray-500 font-medium">Type-Safe Kanban Management</p> */}
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>+</span> Add New Task
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">

        {/* Search & Filter Controls */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">

          {/* Search Bar */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Priority Filter */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Priority:
            </label>
            {/* Priority Filter Dropdown */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as Priority | 'all')}
              className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-[11px] h-10 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

        </div>

        {/* Kanban Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          <Column
            title="To Do"
            status="todo"
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
          <Column
            title="In Progress"
            status="in-progress"
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
          <Column
            title="Completed"
            status="completed"
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </div>

      </main>

      {/* Task Form Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />

    </div>
  );
}