function TaskForm({ onSubmit, initialData = null, buttonText }) {
  const [title, setTitle] = React.useState(initialData ? initialData.title : "");
  const [description, setDescription] = React.useState(
    initialData ? initialData.description : ""
  );
  const [dueDate, setDueDate] = React.useState(
    initialData ? initialData.dueDate : ""
  );
  const [priority, setPriority] = React.useState(
    initialData ? initialData.priority : "Medium"
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Task title is required");
      return;
    }

    onSubmit({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority
    });

    if (!initialData) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
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

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <button type="submit">{buttonText}</button>
    </form>
  );
}
