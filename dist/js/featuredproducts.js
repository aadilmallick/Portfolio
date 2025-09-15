import { DOM, html } from "./DOM.js";
import { initTilt } from "./tilt.js";

/**
 * Fetches notebook products from the JSON file.
 * @returns {Promise<Array>} Array of product objects.
 */
async function fetchNotebooks() {
  try {
  const jsonUrl = new URL('../json/notebook-products.json', import.meta.url).href;
  const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const notebooks = await response.json();
    // Store in localStorage
    localStorage.setItem('notebookProducts', JSON.stringify(notebooks));
    return notebooks;
  } catch (error) {
    console.error('Fetch failed:', error);
    // Try to get from localStorage
    const cached = localStorage.getItem('notebookProducts');
    if (cached) {
      return JSON.parse(cached);
    }
    throw error;
  }
}

/**
 * Creates a product card element.
 * @param {Object} product - The product object.
 * @param {string} product.title - Product title.
 * @param {string} product.price - Product price.
 * @param {string} product.link - Checkout link.
 * @param {string} product.description - Product description.
 * @param {string} product.id - Product ID.
 * @returns {HTMLElement} The card element.
 */
function createProductCard(product) {
  const imageUrl = new URL(`../images/products/${product.id}.jpg`, import.meta.url).href;
    const cardHtml = html`
        <div class="fp-split">
          <div class="fp-media">
            <img src="${imageUrl}" alt="${product.title}" />
          </div>
          <div class="fp-content">
            <h3 class="fp-title">${product.title}</h3>
            <p class="fp-price">${product.price}</p>
            <p class="fp-desc">${product.description || 'No description available.'}</p>
            <a href="${product.link}" target="_blank" class="fp-cta">Buy Notebook</a>
          </div>
        </div>
    `;

    return DOM.createDomElement(cardHtml);
}

/**
 * Renders the products to the page.
 * @param {Array} products - Array of product objects.
 */
function renderProducts(products) {
  const container = document.getElementById('featured-products');
  container.innerHTML = '';
  // take first 3
  const three = products.slice(0, 3);
  three.forEach((product, idx) => {
    const el = createProductCard(product);
    // alternate layout class
    if (idx % 2 === 1) el.classList.add('reverse');
    container.appendChild(el);
  });
}

/**
 * Initialize featured products
 */
async function initFeatured() {
  try {
    const products = await fetchNotebooks();
    renderProducts(products);
  // initialize tilt on newly rendered images
  initTilt();
  } catch (err) {
    const container = document.getElementById('featured-products');
    container.innerHTML = '<p class="error-message">Unable to load featured products.</p>';
  }
}

document.addEventListener('DOMContentLoaded', initFeatured);