
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;            // Unique identifier (UUID ya timestamp)
  title: string;         // Task ka naam
  description: string;   // Task ki detail
  status: Status;        // Current column status
  priority: Priority;    // Priority level
  createdAt: string;     // Task creation date
}

// 4. Form Submit karte waqt naya task banane ka payload type
// (Isme 'id' aur 'createdAt' nahi hotey kyunki wo auto-generate honge)
export interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
}