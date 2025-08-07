 
  

  
    // --- Sign In ---
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const user_id = document.getElementById('user_id').value.trim();
      const password = document.getElementById('password').value.trim();

      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, password })
      });
      const data = await res.json();
      const statusEl = document.getElementById('loginStatus');

      if (res.ok) {
        statusEl.innerHTML = '<span class="text-success">Login successful! Redirecting...</span>';
        setTimeout(() => location.href = 'dashboard.html', 1200);
      } else {
        statusEl.innerHTML = `<span class="text-danger">${data.error || 'Login failed'}</span>`;
      }
    });

    // --- Sign Up ---
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        fullName: document.getElementById('fullName').value.trim(),
        empId: document.getElementById('empId').value.trim(),
        department: document.getElementById('departmentSelect').value,
        email: document.getElementById('signupEmail').value.trim(),
        password: document.getElementById('signupPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value
      };








      // Simple client‑side validation
      if (payload.password !== payload.confirmPassword) {
        document.getElementById('signupStatus').innerHTML = '<span class="text-warning">Passwords do not match.</span>';
        return;
      }

      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const statusEl = document.getElementById('signupStatus');

      if (res.ok) {
        statusEl.innerHTML = '<span class="text-success">Account created! You can now log in.</span>';
        setTimeout(() => {
          const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
          signupModal.hide();
          bootstrap.Modal.getOrCreateInstance(document.getElementById('signinModal')).show();
        }, 1200);
      } else {
        statusEl.innerHTML = `<span class="text-danger">${data.error || 'Registration failed'}</span>`;
      }
    });


    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,es,fr,de',
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
      }, 'google_translate_element');
    }
 
