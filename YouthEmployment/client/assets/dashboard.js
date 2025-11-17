const apiUrl = 'http://localhost:5000/api/jobs';
const table = document.getElementById('jobsTable');
const form = document.getElementById('jobForm');
const alertBox = document.getElementById('alertBox');

function showAlert(message, type = 'success') {
  alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  setTimeout(() => (alertBox.innerHTML = ''), 3000);
}

// Fetch all jobs
async function loadJobs() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  table.innerHTML = '';
  data.forEach(job => {
    table.innerHTML += `
      <tr>
        <td>${job.id}</td>
        <td><input class="form-control" value="${job.employer_name}" id="emp-${job.id}" /></td>
        <td><input class="form-control" value="${job.title}" id="title-${job.id}" /></td>
        <td><input class="form-control" value="${job.description}" id="desc-${job.id}" /></td>
        <td><input class="form-control" value="${job.location}" id="loc-${job.id}" /></td>
        <td><input class="form-control" value="${job.salary}" id="sal-${job.id}" /></td>
        <td>
          <button class="btn btn-success btn-sm" onclick="updateJob(${job.id})">Save</button>
          <button class="btn btn-danger btn-sm" onclick="deleteJob(${job.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}


form.addEventListener('submit', async e => {
  e.preventDefault();
  const jobData = {
    employer: document.getElementById("employer").value,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    location: document.getElementById("location").value,
    salary: document.getElementById("salary").value,
  };
  console.log("Enviando:",jobData);
  addJob(jobData)
  
});

// Add new job
async function addJob(jobData) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData)
  });
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    alert('Job added successfully!');
    form.reset();
    loadJobs();
  } else {
    alert('Error adding job', 'danger');
  }
}
// Update job
async function updateJob(id) {
  const job = {
    employer_name: document.getElementById(`emp-${id}`).value,
    job_title: document.getElementById(`title-${id}`).value,
    description: document.getElementById(`desc-${id}`).value,
    location: document.getElementById(`loc-${id}`).value,
    salary: document.getElementById(`sal-${id}`).value,
  };
  const res = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  if (res.ok) showAlert('Job updated!');
  else showAlert('Update failed', 'danger');
}

// Delete job
async function deleteJob(id) {
  const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  if (res.ok) {
    showAlert('Job deleted!');
    loadJobs();
  } else {
    showAlert('Delete failed', 'danger');
  }
}

loadJobs();
