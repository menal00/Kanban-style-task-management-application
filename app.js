
const { useState, useEffect } = React;

function App() {
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      return JSON.parse(savedBoards);
    }

    return [
      {
        id: Date.now(),
        title: "To Do",
        tasks: []
      }
    ];
  });

  function getTaskLabel(dueDate) {
    if (!dueDate) return "No Due Date";

    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = due - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      return "Overdue";
    } else if (diffDays <= 2) {
      return "Due Soon";
    } else {
      return "On Track";
    }
  }

  function updateAllTaskLabels(boardList) {
    return boardList.map((board) => {
      const updatedTasks = board.tasks.map((task) => ({
        ...task,
        label: getTaskLabel(task.dueDate)
      }));

      return {
        ...board,
        tasks: updatedTasks
      };
    });
  }

  useEffect(() => {
    const updatedBoards = updateAllTaskLabels(boards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  }, [boards]);

  function addTask(boardId, taskData) {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      createdAt: new Date().toISOString().split("T")[0],
      dueDate: taskData.dueDate,
      label: getTaskLabel(taskData.dueDate)
    };

    const updatedBoards = boards.map((board) => {
      if (board.id === boardId) {
        return {
          ...board,
          tasks: [...board.tasks, newTask]
        };
      }
      return board;
    });

    setBoards(updatedBoards);
  }

  function editTask(boardId, taskId, updatedTaskData) {
    const updatedBoards = boards.map((board) => {
      if (board.id === boardId) {
        const updatedTasks = board.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              title: updatedTaskData.title,
              description: updatedTaskData.description,
              dueDate: updatedTaskData.dueDate,
              label: getTaskLabel(updatedTaskData.dueDate)
            };
          }
          return task;
        });

        return {
          ...board,
          tasks: updatedTasks
        };
      }
      return board;
    });

    setBoards(updatedBoards);
  }

  function deleteTask(boardId, taskId) {
    const updatedBoards = boards.map((board) => {
      if (board.id === boardId) {
        return {
          ...board,
          tasks: board.tasks.filter((task) => task.id !== taskId)
        };
      }
      return board;
    });

    setBoards(updatedBoards);
  }

  const totalBoards = boards.length;
  const totalTasks = boards.reduce((sum, board) => sum + board.tasks.length, 0);
  const overdueTasks = boards.reduce((sum, board) => {
    return sum + board.tasks.filter((task) => task.label === "Overdue").length;
  }, 0);
  const dueSoonTasks = boards.reduce((sum, board) => {
    return sum + board.tasks.filter((task) => task.label === "Due Soon").length;
  }, 0);

  return (
    <div className="app">
      <h1>Kanban Task Manager</h1>

      <CounterBar
        totalBoards={totalBoards}
        totalTasks={totalTasks}
        overdueTasks={overdueTasks}
        dueSoonTasks={dueSoonTasks}
      />

      <div className="boards-container">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            addTask={addTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

            function addBoard() {
  const boardTitle = prompt("Enter board name:");

  if (!boardTitle || boardTitle.trim() === "") {
    return;
  }

  const newBoard = {
    id: Date.now(),
    title: boardTitle,
    tasks: []
  };

  setBoards([...boards, newBoard]);
}

function renameBoard(boardId) {
  const newTitle = prompt("Enter new board name:");

  if (!newTitle || newTitle.trim() === "") {
    return;
  }

  const updatedBoards = boards.map((board) => {
    if (board.id === boardId) {
      return {
        ...board,
        title: newTitle
      };
    }
    return board;
  });

  setBoards(updatedBoards);
}

function deleteBoard(boardId) {
  const confirmDelete = window.confirm("Are you sure you want to delete this board?");

  if (!confirmDelete) {
    return;
  }

  const updatedBoards = boards.filter((board) => board.id !== boardId);
  setBoards(updatedBoards);
}

return (
  <div className="app">
    <h1>Kanban Task Manager</h1>

    <CounterBar
      totalBoards={totalBoards}
      totalTasks={totalTasks}
      overdueTasks={overdueTasks}
      dueSoonTasks={dueSoonTasks}
    />

    <div className="top-actions">
      <button onClick={addBoard}>Add New Board</button>
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
        />
      ))}
    </div>
  </div>
);
