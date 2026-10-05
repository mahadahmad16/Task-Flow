import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import TaskControls from "./components/TaskControls";
import useTasks from "./hooks/useTasks";
import "./App.css";

function App() {
  const {
    tasks,
    sortedTasks,
    totalTasks,
    pendingTasks,
    completedTasks,
    search,
    setSearch,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
  } = useTasks();

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div>
            <p className="eyebrow">TASK MANAGER</p>

            <h1>TaskFlow</h1>

            <p className="subtitle">
              Organize your tasks and get things done.
            </p>
          </div>

          <div className="task-count">
            <span>{tasks.length}</span>
            <small>Tasks</small>
          </div>
        </header>

        <main>
          <TaskForm onAddTask={addTask} />

          <TaskStats
            total={totalTasks}
            pending={pendingTasks}
            completed={completedTasks}
          />

          <section className="tasks-section">
            <div className="section-heading">
              <h2>Your Tasks</h2>

              <p>
                {tasks.length === 0
                  ? "You don't have any tasks yet."
                  : `${tasks.length} task${
                      tasks.length !== 1 ? "s" : ""
                    } in your list.`}
              </p>
            </div>

            <TaskControls
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {search && sortedTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">?</div>

                <h3>No matching tasks</h3>

                <p>
                  Try searching for a different task or
                  description.
                </p>
              </div>
            ) : (
              <TaskList
                tasks={sortedTasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;