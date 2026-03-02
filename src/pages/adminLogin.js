import { login } from '../data/store.js';

export function renderAdminLogin() {
    return `
    <section class="admin-login-page">
      <div class="admin-login-card glass-card">
        <div class="admin-login-header">
          <div class="admin-login-icon">🔐</div>
          <h1>Admin Dashboard</h1>
          <p>Enter your password to continue</p>
        </div>
        <form id="admin-login-form" class="admin-login-form">
          <div class="form-group">
            <label for="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              placeholder="Enter admin password"
              autocomplete="current-password"
              required
            />
          </div>
          <div id="login-error" class="login-error" style="display:none;">
            Incorrect password. Please try again.
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">
            Sign In →
          </button>
        </form>
        <p class="admin-login-note">
          <span>🔒</span> Access restricted to store administrators
        </p>
      </div>
    </section>
  `;
}

export function initAdminLogin() {
    const form = document.getElementById('admin-login-form');
    const errorEl = document.getElementById('login-error');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;

        if (login(password)) {
            window.location.hash = '#admin';
        } else {
            errorEl.style.display = 'block';
            document.getElementById('admin-password').value = '';
            document.getElementById('admin-password').focus();
        }
    });
}
