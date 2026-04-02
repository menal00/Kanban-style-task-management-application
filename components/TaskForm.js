function TaskForm({ onSubmit, initialData = null, buttonText }) {
  // /---------/ State Initialization /---------/
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
// /---------/ Form Submission Handler /---------/
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
// /---------/ Clear Form After Submission (Create Mode) /---------/
    if (!initialData) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
    }
  }
// /---------/ Render Form /---------/
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
// /---------/ Title Input /---------/
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
// /---------/ Due Date Input /---------/
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
// /---------/ Priority Select Dropdown /---------/
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
// /---------/ Submit Button /---------/
      <button type="submit">{buttonText}</button>
    </form>
  );
}
