
function TaskForm({ onSubmit, initialData = null, buttonText }) {
  const [title, setTitle] = React.useState(initialData ? initialData.title : "");
  const [description, setDescription] = React.useState(initialData ? initialData.description : "");
  const [dueDate, setDueDate] = React.useState(initialData ? initialData.dueDate : "");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Task title is required");
      return;
    }

    onSubmit({
      title,
      description,
      dueDate
    });

    if (!initialData) {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">{buttonText}</button>
    </form>
  );
}
