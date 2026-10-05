import type { Filter, SortOption } from "../types/filters";

interface TaskControlsProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: Filter;
  onFilterChange: (value: Filter) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

function TaskControls({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
}: TaskControlsProps) {
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your tasks..."
        />

        {search && (
          <button
            type="button"
            className="clear-search"
            onClick={() => onSearchChange("")}
          >
            Clear
          </button>
        )}
      </div>

      <div className="task-controls">
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => onFilterChange("pending")}
          >
            Pending
          </button>

          <button
            className={
              filter === "completed" ? "active" : ""
            }
            onClick={() => onFilterChange("completed")}
          >
            Completed
          </button>
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value as SortOption)
          }
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </>
  );
}

export default TaskControls;