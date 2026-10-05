import { useState } from "react";
import type { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (
    id: number,
    title: string,
    description: string,
    dueDate: string,
    priority: Task["priority"]
  ) => void;
}

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] =
    useState<string>("");
  const [editDueDate, setEditDueDate] = useState<string>("");
  const [editPriority, setEditPriority] =
    useState<Task["priority"]>("medium");

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate);
    setEditPriority(task.priority);
  };

  const saveEdit = () => {
    if (editingId === null || !editTitle.trim()) {
      return;
    }

    onEditTask(
      editingId,
      editTitle.trim(),
      editDescription.trim(),
      editDueDate,
      editPriority
    );

    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditDueDate("");
    setEditPriority("medium");
  };

  const isOverdue = (task: Task) => {
    if (!task.dueDate || task.completed) {
      return false;
    }

    return new Date(task.dueDate) < new Date();
  };

  const formatDate = (date: string) => {
    if (!date) {
      return "";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article
          className={`task-card ${
            task.completed ? "completed" : ""
          }`}
          key={task.id}
        >
          {editingId === task.id ? (
            <div className="edit-form">
              <div className="input-group">
                <label>Task title</label>

                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Description</label>

                <textarea
                  value={editDescription}
                  onChange={(e) =>
                    setEditDescription(e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Due date</label>

                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) =>
                      setEditDueDate(e.target.value)
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Priority</label>

                  <select
                    value={editPriority}
                    onChange={(e) =>
                      setEditPriority(
                        e.target.value as Task["priority"]
                      )
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="edit-actions">
                <button
                  className="save-button"
                  onClick={saveEdit}
                >
                  Save Changes
                </button>

                <button
                  className="cancel-button"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="task-content">
                <div
                  className={`status-dot ${
                    task.completed ? "done" : ""
                  }`}
                />

                <div className="task-info">
                  <div className="task-title-row">
                    <h3>{task.title}</h3>

                    <span
                      className={`priority-badge ${task.priority}`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {task.description && (
                    <p>{task.description}</p>
                  )}

                  <div className="task-meta">
                    {task.dueDate && (
                      <span
                        className={
                          isOverdue(task)
                            ? "due-date overdue"
                            : "due-date"
                        }
                      >
                        {isOverdue(task)
                          ? "Overdue · "
                          : "Due · "}
                        {formatDate(task.dueDate)}
                      </span>
                    )}

                    <span className="status">
                      {task.completed
                        ? "Completed"
                        : "In progress"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="complete-button"
                  onClick={() => onToggleTask(task.id)}
                >
                  {task.completed
                    ? "Mark Pending"
                    : "Complete"}
                </button>

                <button
                  className="edit-button"
                  onClick={() => startEditing(task)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
}

export default TaskList;