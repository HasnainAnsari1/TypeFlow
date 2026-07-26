import React, { useState } from 'react';
import type { Priority, Status, CreateTaskInput } from '../types/task';

// Props Interface
interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (taskInput: CreateTaskInput) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
    // Local Form States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [status, setStatus] = useState<Status>('todo');

    // Agar modal open nahi hai toh kuch render mat karo
    if (!isOpen) return null;

    // Form Submit Handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        if (!title.trim() || !description.trim()) {
            alert('Please fill in all fields!');
            return;
        }

        // Parent ko data bhej rahe hain
        onAddTask({
            title,
            description,
            priority,
            status,
        });

        // Form reset & modal close
        setTitle('');
        setDescription('');
        setPriority('medium');
        setStatus('todo');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 font-bold text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            placeholder="e.g. Design Landing Page"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                            placeholder="Task details..."
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Priority Dropdown */}
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-10 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    {/* Initial Status Dropdown */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Status)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-10 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                        >
                            Add Task
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};