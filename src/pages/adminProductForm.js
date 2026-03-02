import { getProducts, saveProduct } from '../data/store.js';
import { seriesInfo } from '../data/products.js';

function getEditProduct() {
    const hash = window.location.hash;
    const match = hash.match(/id=([^&]+)/);
    if (!match) return null;
    const products = getProducts();
    return products.find((p) => p.id === match[1]) || null;
}

export function renderAdminProductForm() {
    const product = getEditProduct();
    const isEdit = !!product;
    const seriesOptions = Object.keys(seriesInfo);

    const p = product || {
        id: '',
        name: '',
        series: 'Palma',
        tagline: '',
        description: '',
        price: 'Contact for Price',
        featured: false,
        badge: '',
        specs: {
            screen: '', resolution: '', cpu: '', ram: '', storage: '',
            os: '', connectivity: '', battery: '', weight: '', dimensions: '',
            camera: '', stylus: '', extras: ''
        },
        colors: [],
        image: ''
    };

    return `
    <section class="admin-form-page">
      <div class="admin-form-container">
        <div class="admin-form-header">
          <a href="#admin" class="btn btn-secondary">← Back</a>
          <h1>${isEdit ? 'Edit Product' : 'Add New Product'}</h1>
        </div>

        <form id="product-form" class="admin-form glass-card">
          <div class="form-grid">
            <!-- Basic Info -->
            <div class="form-section">
              <h3>📋 Basic Information</h3>
              <div class="form-group">
                <label for="p-name">Product Name *</label>
                <input type="text" id="p-name" value="${p.name}" placeholder="e.g. BOOX Palma 2 Pro" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="p-series">Series *</label>
                  <select id="p-series">
                    ${seriesOptions.map(s => `<option value="${s}" ${p.series === s ? 'selected' : ''}>${s}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label for="p-badge">Badge</label>
                  <select id="p-badge">
                    <option value="" ${!p.badge ? 'selected' : ''}>None</option>
                    <option value="NEW" ${p.badge === 'NEW' ? 'selected' : ''}>NEW</option>
                    <option value="POPULAR" ${p.badge === 'POPULAR' ? 'selected' : ''}>POPULAR</option>
                    <option value="PRO" ${p.badge === 'PRO' ? 'selected' : ''}>PRO</option>
                    <option value="PREMIUM" ${p.badge === 'PREMIUM' ? 'selected' : ''}>PREMIUM</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="p-tagline">Tagline *</label>
                <input type="text" id="p-tagline" value="${p.tagline}" placeholder="e.g. 6.13&quot; Color Mobile ePaper with 5G" required />
              </div>
              <div class="form-group">
                <label for="p-description">Description *</label>
                <textarea id="p-description" rows="4" placeholder="Full product description..." required>${p.description}</textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="p-price">Price</label>
                  <input type="text" id="p-price" value="${p.price}" placeholder="e.g. 550,000 MMK" />
                </div>
                <div class="form-group">
                  <label for="p-image">Image Key</label>
                  <input type="text" id="p-image" value="${p.image}" placeholder="e.g. palma2pro" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="p-colors">Colors (comma separated)</label>
                  <input type="text" id="p-colors" value="${(p.colors || []).join(', ')}" placeholder="Black, White" />
                </div>
                <div class="form-group form-checkbox">
                  <label>
                    <input type="checkbox" id="p-featured" ${p.featured ? 'checked' : ''} />
                    Featured Product
                  </label>
                </div>
              </div>
            </div>

            <!-- Specs -->
            <div class="form-section">
              <h3>⚙️ Specifications</h3>
              <div class="form-group">
                <label for="p-screen">Screen</label>
                <input type="text" id="p-screen" value="${p.specs.screen || ''}" placeholder="e.g. 6.13&quot; Kaleido 3 glass screen" />
              </div>
              <div class="form-group">
                <label for="p-resolution">Resolution</label>
                <input type="text" id="p-resolution" value="${p.specs.resolution || ''}" placeholder="e.g. 824×1648 (300ppi)" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="p-cpu">CPU</label>
                  <input type="text" id="p-cpu" value="${p.specs.cpu || ''}" placeholder="e.g. Octa-core + BSR" />
                </div>
                <div class="form-group">
                  <label for="p-ram">RAM</label>
                  <input type="text" id="p-ram" value="${p.specs.ram || ''}" placeholder="e.g. 8GB" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="p-storage">Storage</label>
                  <input type="text" id="p-storage" value="${p.specs.storage || ''}" placeholder="e.g. 128GB" />
                </div>
                <div class="form-group">
                  <label for="p-os">OS</label>
                  <input type="text" id="p-os" value="${p.specs.os || ''}" placeholder="e.g. Android 15" />
                </div>
              </div>
              <div class="form-group">
                <label for="p-connectivity">Connectivity</label>
                <input type="text" id="p-connectivity" value="${p.specs.connectivity || ''}" placeholder="e.g. Wi-Fi + BT 5.1" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="p-battery">Battery</label>
                  <input type="text" id="p-battery" value="${p.specs.battery || ''}" placeholder="e.g. 3,950mAh" />
                </div>
                <div class="form-group">
                  <label for="p-weight">Weight</label>
                  <input type="text" id="p-weight" value="${p.specs.weight || ''}" placeholder="e.g. 175g" />
                </div>
              </div>
              <div class="form-group">
                <label for="p-dimensions">Dimensions</label>
                <input type="text" id="p-dimensions" value="${p.specs.dimensions || ''}" placeholder="e.g. 159 × 80 × 8.8 mm" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="p-camera">Camera</label>
                  <input type="text" id="p-camera" value="${p.specs.camera || ''}" placeholder="e.g. 16MP Rear" />
                </div>
                <div class="form-group">
                  <label for="p-stylus">Stylus</label>
                  <input type="text" id="p-stylus" value="${p.specs.stylus || ''}" placeholder="e.g. BOOX Pen3" />
                </div>
              </div>
              <div class="form-group">
                <label for="p-extras">Extras</label>
                <input type="text" id="p-extras" value="${p.specs.extras || ''}" placeholder="e.g. Fingerprint, USB-C" />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <a href="#admin" class="btn btn-secondary">Cancel</a>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </section>
  `;
}

export function initAdminProductForm() {
    const form = document.getElementById('product-form');
    const existingProduct = getEditProduct();

    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = existingProduct
            ? existingProduct.id
            : document.getElementById('p-name').value.toLowerCase().replace(/[^a-z0-9]/g, '');

        const product = {
            id,
            name: document.getElementById('p-name').value,
            series: document.getElementById('p-series').value,
            tagline: document.getElementById('p-tagline').value,
            description: document.getElementById('p-description').value,
            price: document.getElementById('p-price').value || 'Contact for Price',
            featured: document.getElementById('p-featured').checked,
            badge: document.getElementById('p-badge').value || null,
            specs: {
                screen: document.getElementById('p-screen').value,
                resolution: document.getElementById('p-resolution').value,
                cpu: document.getElementById('p-cpu').value,
                ram: document.getElementById('p-ram').value,
                storage: document.getElementById('p-storage').value,
                os: document.getElementById('p-os').value,
                connectivity: document.getElementById('p-connectivity').value,
                battery: document.getElementById('p-battery').value,
                weight: document.getElementById('p-weight').value,
                dimensions: document.getElementById('p-dimensions').value,
                camera: document.getElementById('p-camera').value,
                stylus: document.getElementById('p-stylus').value,
                extras: document.getElementById('p-extras').value,
            },
            colors: document.getElementById('p-colors').value
                .split(',')
                .map((c) => c.trim())
                .filter(Boolean),
            image: document.getElementById('p-image').value || id,
        };

        saveProduct(product);
        window.location.hash = '#admin';
    });
}
