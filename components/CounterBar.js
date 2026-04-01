function CounterBar({
  totalBoards,
  totalTasks,
  overdueTasks,
  dueSoonTasks,
  highPriorityTasks
}) {
  return (
    <div className="counter-bar">
      <div className="counter-box">Boards: {totalBoards}</div>
      <div className="counter-box">Tasks: {totalTasks}</div>
      <div className="counter-box">Overdue: {overdueTasks}</div>
      <div className="counter-box">Due Soon: {dueSoonTasks}</div>
      <div className="counter-box">High Priority: {highPriorityTasks}</div>
    </div>
  );
}
