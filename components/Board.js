
function Board({ board, addTask, editTask, deleteTask }) {
  const [showForm, setShowForm] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState(null);

  return (
    <div className="board">
      <h2>{board.title}</h2>

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
          <div className="task-card" key={task.id}>
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

          function Board({ board, addTask, editTask, deleteTask, renameBoard, deleteBoard }) {
  const [showForm, setShowForm] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState(null);

  return (
    <div className="board">
      <h2>{board.title}</h2>

      <button onClick={() => renameBoard(board.id)}>Rename Board</button>
      <button onClick={() => deleteBoard(board.id)}>Delete Board</button>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form": "Add Task"}
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
          <div className="task-card" key={task.id}>
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
    </div>
  );
}
