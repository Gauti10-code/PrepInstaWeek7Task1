document.getElementById('task-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const courseId = document.getElementById('courseId').value;
  const taskName = document.getElementById('taskName').value;
  const dueDate = document.getElementById('dueDate').value;
  const details = document.getElementById('details').value;

  const taskData = {
      courseId,
      taskName,
      dueDate,
      details
  };

  try {
      const response = await fetch('/addTask', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
      });

      if (response.ok) {
          alert('Task added successfully!');
          document.getElementById('task-form').reset();
      } else {
          alert('Failed to add task');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error adding task');
  }
});
