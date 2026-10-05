import { useState } from "react";
import type { Priority, Task } from "../types/task";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [titleError, setTitleError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError("Task title is required.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setTitleError("Task title must be at least 3 characters.");
      return;
    }

    setTitleError("");

    const newTask: Task = {
      id: Date.now(),
      title: trimmedTitle,
      description: description.trim(),
      completed: false,
      dueDate,
      priority,
    };

    onAddTask(newTask);

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setTitle(value);

    if (titleError) {
      if (!value.trim()) {
        setTitleError("Task title is required.");
      } else if (value.trim().length < 3) {
        setTitleError(
          "Task title must be at least 3 characters."
        );
      } else {
        setTitleError("");
      }
    }
  };

  return (
    <section className="form-card">
      <div className="section-heading">
        <h2>Add New Task</h2>

        <p>
          Create a task and keep track of your progress.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <label htmlFor="title">Task title</label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="What needs to be done?"
            className={titleError ? "input-error" : ""}
          />

          {titleError && (
            <span className="error-message">
              {titleError}
            </span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details..."
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dueDate">Due date</label>

            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="priority">Priority</label>

            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Priority)
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;