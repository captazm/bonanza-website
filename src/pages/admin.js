import { getProducts, deleteProduct, getPosts, deletePost, logout } from '../data/store.js';

export function renderAdmin() {
    const products = getProducts();
    const posts = getPosts();

    return `
    <section class="admin-page">
      <div class="admin-container">
        <div class="admin-sidebar glass-card">
          <div class="admin-sidebar-header">
            <h2>⚡ Admin</h2>
          </div>
          <nav class="admin-nav">
            <button class="admin-nav-btn active" data-tab="products">
              <span>📦</span> Products
            </button>
            <button class="admin-nav-btn" data-tab="blog">
              <span>📝</span> Blog Posts
            </button>
            <button class="admin-nav-btn admin-nav-logout" id="admin-logout">
              <span>🚪</span> Sign Out
            </button>
          </nav>
        </div>

        <div class="admin-content">
          <!-- Stats -->
          <div class="admin-stats">
            <div class="admin-stat-card glass-card">
              <div class="admin-stat-icon">📦</div>
              <div class="admin-stat-info">
                <span class="admin-stat-value">${products.length}</span>
                <span class="admin-stat-label">Products</span>
              </div>
            </div>
            <div class="admin-stat-card glass-card">
              <div class="admin-stat-icon">📝</div>
              <div class="admin-stat-info">
                <span class="admin-stat-value">${posts.length}</span>
                <span class="admin-stat-label">Blog Posts</span>
              </div>
            </div>
            <div class="admin-stat-card glass-card">
              <div class="admin-stat-icon">⭐</div>
              <div class="admin-stat-info">
                <span class="admin-stat-value">${products.filter(p => p.featured).length}</span>
                <span class="admin-stat-label">Featured</span>
              </div>
            </div>
            <div class="admin-stat-card glass-card">
              <div class="admin-stat-icon">📢</div>
              <div class="admin-stat-info">
                <span class="admin-stat-value">${posts.filter(p => p.published).length}</span>
                <span class="admin-stat-label">Published</span>
              </div>
            </div>
          </div>

          <!-- Products Tab -->
          <div class="admin-tab active" id="tab-products">
            <div class="admin-tab-header">
              <h2>Products</h2>
              <a href="#admin-product" class="btn btn-primary">+ Add Product</a>
            </div>
            <div class="admin-table-wrap glass-card">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Series</th>
                    <th>Price</th>
                    <th>Badge</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.map(p => `
                    <tr>
                      <td>
                        <div class="admin-product-name">
                          <strong>${p.name}</strong>
                          <small>${p.tagline}</small>
                        </div>
                      </td>
                      <td><span class="badge badge-new">${p.series}</span></td>
                      <td>${p.price}</td>
                      <td>${p.badge ? `<span class="badge badge-${(p.badge || '').toLowerCase()}">${p.badge}</span>` : '—'}</td>
                      <td>${p.featured ? '⭐' : '—'}</td>
                      <td>
                        <div class="admin-actions">
                          <a href="#admin-product?id=${p.id}" class="admin-action-btn edit" title="Edit">✏️</a>
                          <button class="admin-action-btn delete" data-delete-product="${p.id}" title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              ${products.length === 0 ? '<p class="admin-empty">No products yet. Click "Add Product" to start.</p>' : ''}
            </div>
          </div>

          <!-- Blog Tab -->
          <div class="admin-tab" id="tab-blog">
            <div class="admin-tab-header">
              <h2>Blog Posts</h2>
              <a href="#admin-blog-form" class="btn btn-primary">+ New Post</a>
            </div>
            <div class="admin-table-wrap glass-card">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Published</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${posts.map(p => `
                    <tr>
                      <td>
                        <div class="admin-product-name">
                          <strong>${p.title}</strong>
                          <small>${(p.excerpt || '').substring(0, 60)}...</small>
                        </div>
                      </td>
                      <td><span class="badge badge-new">${p.category || 'General'}</span></td>
                      <td>${p.published ? '<span style="color:var(--accent-tertiary)">✔ Live</span>' : '<span style="color:var(--text-tertiary)">Draft</span>'}</td>
                      <td>${p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}</td>
                      <td>
                        <div class="admin-actions">
                          <a href="#admin-blog-form?id=${p.id}" class="admin-action-btn edit" title="Edit">✏️</a>
                          <button class="admin-action-btn delete" data-delete-post="${p.id}" title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              ${posts.length === 0 ? '<p class="admin-empty">No blog posts yet. Click "New Post" to start writing.</p>' : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initAdmin() {
    // Tab switching
    document.querySelectorAll('.admin-nav-btn[data-tab]').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const tab = document.getElementById(`tab-${btn.dataset.tab}`);
            if (tab) tab.classList.add('active');
        });
    });

    // Logout
    document.getElementById('admin-logout')?.addEventListener('click', () => {
        logout();
        window.location.hash = '#home';
    });

    // Delete product
    document.querySelectorAll('[data-delete-product]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.deleteProduct;
            if (confirm('Delete this product? This cannot be undone.')) {
                deleteProduct(id);
                window.location.hash = '#admin';
                // Force re-render
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            }
        });
    });

    // Delete post
    document.querySelectorAll('[data-delete-post]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.deletePost;
            if (confirm('Delete this blog post? This cannot be undone.')) {
                deletePost(id);
                window.location.hash = '#admin';
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            }
        });
    });
}
