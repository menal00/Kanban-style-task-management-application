const { useState, useEffect } = React;

function App() {
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem("boards");

    if (savedBoards) {
      return JSON.parse(savedBoards);
    }

    return [
      { id: 1, title: "To Do", tasks: [] },
      { id: 2, title: "In Progress", tasks: [] },
      { id: 3, title: "Done", tasks: [] }
    ];
  });

  function getTaskLabel(dueDate) {
    if (!dueDate) return "No Due Date";

    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffDays = (due - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return "Overdue";
    if (diffDays <= 2) return "Due Soon";
    return "On Track";
  }

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  function addTask(boardId, taskData) {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      createdAt: new Date().toISOString().split("T")[0],
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      label: getTaskLabel(taskData.dueDate)
    };

    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    );
  }

  function editTask(boardId, taskId, updatedTaskData) {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    ...updatedTaskData,
                    label: getTaskLabel(updatedTaskData.dueDate)
                  }
                : task
            )
          };
        }
        return board;
      })
    );
  }

  function deleteTask(boardId, taskId) {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: board.tasks.filter((t) => t.id !== taskId) }
          : board
      )
    );
  }

  function addBoard() {
    const name = prompt("Board name:");
    if (!name) return;

    setBoards([...boards, { id: Date.now(), title: name, tasks: [] }]);
  }

  function renameBoard(id) {
    const name = prompt("New name:");
    if (!name) return;

    setBoards(
      boards.map((b) => (b.id === id ? { ...b, title: name } : b))
    );
  }

  function deleteBoard(id) {
    if (!confirm("Delete board?")) return;
    setBoards(boards.filter((b) => b.id !== id));
  }

  function moveTask(sourceBoardId, targetBoardId, taskId, targetTaskId) {
    let taskToMove = null;

    const updated = boards.map((board) => {
      if (board.id === sourceBoardId) {
        return {
          ...board,
          tasks: board.tasks.filter((t) => {
            if (t.id === taskId) taskToMove = t;
            return t.id !== taskId;
          })
        };
      }
      return board;
    });

    setBoards(
      updated.map((board) => {
        if (board.id === targetBoardId && taskToMove) {
          const newTasks = [...board.tasks];

          if (!targetTaskId) {
            newTasks.push(taskToMove);
          } else {
            const index = newTasks.findIndex((t) => t.id === targetTaskId);
            newTasks.splice(index, 0, taskToMove);
          }

          return { ...board, tasks: newTasks };
        }
        return board;
      })
    );
  }

  // ✅ counters
  const totalBoards = boards.length;
  const totalTasks = boards.reduce((s, b) => s + b.tasks.length, 0);

  const overdueTasks = boards.reduce(
    (s, b) => s + b.tasks.filter((t) => t.label === "Overdue").length,
    0
  );

  const dueSoonTasks = boards.reduce(
    (s, b) => s + b.tasks.filter((t) => t.label === "Due Soon").length,
    0
  );

  const highPriorityTasks = boards.reduce(
    (s, b) => s + b.tasks.filter((t) => t.priority === "High").length,
    0
  );

  return (
    <div className="app">
      <h1>Kanban Task Manager</h1>

      <CounterBar
        totalBoards={totalBoards}
        totalTasks={totalTasks}
        overdueTasks={overdueTasks}
        dueSoonTasks={dueSoonTasks}
        highPriorityTasks={highPriorityTasks}
      />

      <div className="top-actions">
        <button onClick={addBoard}>Add Board</button>
      </div>

      <div className="boards-container">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            addTask={addTask}
            editTask={editTask}
            deleteTask={deleteTask}
            renameBoard={renameBoard}
            deleteBoard={deleteBoard}
            moveTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
