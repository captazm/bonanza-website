import './index.css';
import { renderHeader, initHeader } from './src/components/header.js';
import { renderFooter } from './src/components/footer.js';
import { renderProductDetail, initProductDetail } from './src/components/productDetail.js';
import { renderHome } from './src/pages/home.js';
import { renderProducts, initProductsPage } from './src/pages/products.js';
import { renderAbout } from './src/pages/about.js';
import { renderContact, initContactPage } from './src/pages/contact.js';
import { renderBlog } from './src/pages/blog.js';
import { renderBlogPost } from './src/pages/blogPost.js';
import { renderAdminLogin, initAdminLogin } from './src/pages/adminLogin.js';
import { renderAdmin, initAdmin } from './src/pages/admin.js';
import { renderAdminProductForm, initAdminProductForm } from './src/pages/adminProductForm.js';
import { renderAdminBlogForm, initAdminBlogForm } from './src/pages/adminBlogForm.js';
import { getProducts, isLoggedIn } from './src/data/store.js';
import { initTheme } from './src/theme.js';

// Initialize Theme
initTheme();

const app = document.getElementById('app');

// ========================================
// Router
// ========================================
function getRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    return hash.split('?')[0];
}

const ADMIN_ROUTES = ['admin', 'admin-product', 'admin-blog-form'];

function renderPage() {
    const route = getRoute();
    const isAdmin = ADMIN_ROUTES.includes(route);
    let pageContent = '';

    // Auth guard for admin routes
    if (isAdmin && !isLoggedIn()) {
        window.location.hash = '#admin-login';
        return;
    }

    switch (route) {
        case 'home':
            pageContent = renderHome();
            break;
        case 'products':
            pageContent = renderProducts();
            break;
        case 'about':
            pageContent = renderAbout();
            break;
        case 'contact':
            pageContent = renderContact();
            break;
        case 'blog':
            pageContent = renderBlog();
            break;
        case 'blog-post':
            pageContent = renderBlogPost();
            break;
        case 'admin-login':
            pageContent = renderAdminLogin();
            break;
        case 'admin':
            pageContent = renderAdmin();
            break;
        case 'admin-product':
            pageContent = renderAdminProductForm();
            break;
        case 'admin-blog-form':
            pageContent = renderAdminBlogForm();
            break;
        default:
            pageContent = renderHome();
    }

    // Admin pages: no header/footer
    if (isAdmin || route === 'admin-login') {
        app.innerHTML = `
      <main id="main-content" class="admin-layout">
        ${pageContent}
      </main>
    `;
    } else {
        app.innerHTML = `
      ${renderHeader(route)}
      <main id="main-content">
        ${pageContent}
      </main>
      ${renderFooter()}
    `;
        // Pass renderPage as lang change callback
        initHeader(renderPage);
    }

    // Initialize page-specific functionality
    initScrollAnimations();

    switch (route) {
        case 'products':
            initProductsPage();
            initProductCards();
            break;
        case 'home':
            initProductCards();
            break;
        case 'contact':
            initContactPage();
            break;
        case 'admin-login':
            initAdminLogin();
            break;
        case 'admin':
            initAdmin();
            break;
        case 'admin-product':
            initAdminProductForm();
            break;
        case 'admin-blog-form':
            initAdminBlogForm();
            break;
    }

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    window._scrollObserver = observer;

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
}

// ========================================
// Product Card Click → Modal
// ========================================
function initProductCards() {
    const products = getProducts();
    document.querySelectorAll('.product-card').forEach((card) => {
        card.addEventListener('click', () => {
            const productId = card.dataset.productId;
            const product = products.find((p) => p.id === productId);
            if (!product) return;

            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = renderProductDetail(product);
            document.body.appendChild(modalContainer.firstElementChild);
            initProductDetail();
        });
    });
}

// ========================================
// Initialize
// ========================================
window.addEventListener('hashchange', renderPage);
renderPage();
