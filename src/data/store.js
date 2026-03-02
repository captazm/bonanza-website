import { products as defaultProducts, seriesInfo } from './products.js';

// ========================================
// localStorage Data Store
// ========================================
const KEYS = {
    products: 'bonanza_products',
    posts: 'bonanza_posts',
    auth: 'bonanza_auth',
};

const ADMIN_PASSWORD = 'bonanza2019';

// ========================================
// Products
// ========================================
export function getProducts() {
    const stored = localStorage.getItem(KEYS.products);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return [...defaultProducts];
        }
    }
    // Seed defaults
    localStorage.setItem(KEYS.products, JSON.stringify(defaultProducts));
    return [...defaultProducts];
}

export function saveProduct(product) {
    const products = getProducts();
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
        products[idx] = product;
    } else {
        products.push(product);
    }
    localStorage.setItem(KEYS.products, JSON.stringify(products));
    return products;
}

export function deleteProduct(id) {
    const products = getProducts().filter((p) => p.id !== id);
    localStorage.setItem(KEYS.products, JSON.stringify(products));
    return products;
}

// ========================================
// Blog Posts
// ========================================
export function getPosts() {
    const stored = localStorage.getItem(KEYS.posts);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return [];
        }
    }
    return [];
}

export function savePost(post) {
    const posts = getPosts();
    const idx = posts.findIndex((p) => p.id === post.id);
    if (idx >= 0) {
        posts[idx] = { ...post, updatedAt: new Date().toISOString() };
    } else {
        posts.push({
            ...post,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    }
    localStorage.setItem(KEYS.posts, JSON.stringify(posts));
    return posts;
}

export function deletePost(id) {
    const posts = getPosts().filter((p) => p.id !== id);
    localStorage.setItem(KEYS.posts, JSON.stringify(posts));
    return posts;
}

// ========================================
// Authentication
// ========================================
export function isLoggedIn() {
    return localStorage.getItem(KEYS.auth) === 'true';
}

export function login(password) {
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem(KEYS.auth, 'true');
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem(KEYS.auth);
}

// Re-export series info
export { seriesInfo };
