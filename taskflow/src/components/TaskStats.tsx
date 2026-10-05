interface TaskStatsProps {
  total: number;
  pending: number;
  completed: number;
}

function TaskStats({
  total,
  pending,
  completed,
}: TaskStatsProps) {
  return (
    <section className="task-stats">
      <div className="stat-card">
        <small>Total Tasks</small>
        <strong>{total}</strong>
      </div>

      <div className="stat-card">
        <small>Pending</small>
        <strong>{pending}</strong>
      </div>

      <div className="stat-card">
        <small>Completed</small>
        <strong>{completed}</strong>
      </div>
    </section>
  );
}

export default TaskStats;