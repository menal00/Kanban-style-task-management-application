function Board({
  board,
  addTask,
  editTask,
  deleteTask,
  renameBoard,
  deleteBoard,
  moveTask
}) {
  const [showForm, setShowForm] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState(null);

  return (
    <div
      className="board"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();

        const data = JSON.parse(e.dataTransfer.getData("task"));
        moveTask(data.sourceBoardId, board.id, data.taskId, null);
      }}
    >
      <h2>{board.title}</h2>

      <button onClick={() => renameBoard(board.id)}>Rename Board</button>
      <button onClick={() => deleteBoard(board.id)}>Delete Board</button>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Task"}
      </button>

      {showForm && (
        <TaskForm
          buttonText="Add Task"
          onSubmit={(taskData) => {
            addTask(board.id, taskData);
            setShowForm(false);
          }}
        />
      )}

      <div className="task-list">
        {board.tasks.map((task) => (
          <div
            className="task-card"
            key={task.id}
            draggable="true"
            style={{
              background:
                task.priority === "High"
                  ? "#ffe6e6"
                  : task.priority === "Medium"
                  ? "#fff4e6"
                  : "#e6ffe6"
            }}
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "task",
                JSON.stringify({
                  taskId: task.id,
                  sourceBoardId: board.id
                })
              );
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();

              const data = JSON.parse(e.dataTransfer.getData("task"));
              moveTask(data.sourceBoardId, board.id, data.taskId, task.id);
            }}
          >
            {editingTaskId === task.id ? (
              <TaskForm
                initialData={task}
                buttonText="Save Changes"
                onSubmit={(updatedTaskData) => {
                  editTask(board.id, task.id, updatedTaskData);
                  setEditingTaskId(null);
                }}
              />
            ) : (
              <>
                <p
                  style={{
                    fontWeight: "bold",
                    color:
                      task.priority === "High"
                        ? "red"
                        : task.priority === "Medium"
                        ? "orange"
                        : "green"
                  }}
                >
                  Priority: {task.priority}
                </p>

                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><strong>Created:</strong> {task.createdAt}</p>
                <p><strong>Due:</strong> {task.dueDate || "No date"}</p>
                <p><strong>Status:</strong> {task.label}</p>

                <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
                <button onClick={() => deleteTask(board.id, task.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
