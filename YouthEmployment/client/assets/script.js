// Login
async function login(email, password) {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.accessToken) {
    localStorage.setItem('token', data.accessToken);
    alert('Login feito com sucesso!');
    window.location.href = 'jobs.html';
  } else {
    alert(data.error || 'Erro no login');
  }
}