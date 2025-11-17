// client/assets/script.js
const API = 'http://localhost:5000/api/auth';

async function apiPost(path, body, auth=false) {
  const headers = {'Content-Type':'application/json'};
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(API + path, { method: 'POST', headers, body: JSON.stringify(body) });
  return res.json();
}

async function apiGet(path, auth=false) {
  const headers = {};
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(API + path, { headers });
  // const res2 = await fetch(API2 + path, { headers });
  const text = await res.text();
  // const text2 = await res2.text();
  
  try {
    return JSON.parse(text);
  } catch {
    console.error("Resposta não-JSON:", text);
    throw new Error("Resposta não JSON da API");
  }

}

/* Login form */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = await apiPost('/login', { email, password });
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user || {}));
      alert('Sucessfull Login!');
      window.location.href = 'index.html';
    } else {
      alert(data.error || 'Login error');
    }
  });
}

/* Register form */
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const data = await apiPost('/register', { name, email, password, role });
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      alert('Registration completed! Redirecting...');
      window.location.href = 'index.html';
    } else {
      alert(data.error || 'Error in registration');
    }
  });
}

/* Render jobs */
async function renderJobs() {
  const cont = document.getElementById('jobsList');
  cont.innerHTML = 'Loading...';
  try {
    const jobs = await apiGet('/api/jobs');
    if (!jobs || jobs.error) return cont.innerHTML = `<p>Erro: ${jobs.error||'No vacancies'}</p>`;
    cont.innerHTML = '';
    jobs.forEach(j => {
      const div = document.createElement('div');
      div.className = 'job';
      div.innerHTML = `<h3>${j.title}</h3><p>${j.description.substring(0,200)}</p>
        <small>${j.location || ''}</small>
        <div style="margin-top:10px"><button class="btn apply" data-id="${j.id}">Aplicar</button></div>`;
      cont.appendChild(div);
    });

    document.querySelectorAll('.apply').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        const token = localStorage.getItem('token');
        if (!token) return alert('You need to log in to apply');
        const res = await apiPost(`/jobs/${id}/apply`, {}, true);
        if (res.error) return alert(res.error);
        alert(res.message || 'Applied successfully');
      });
    });

  } catch (err) {
    cont.innerHTML = `<p>Erro: ${err.message}</p>`;
  }
}
