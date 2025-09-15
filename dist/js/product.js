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
        <div class="product-card">
            <img 
                src="${imageUrl}" 
                alt="${product.title}"
                class="product-image"
            >
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description || 'No description available.'}</p>
                <a href="${product.link}" target="_blank" class="checkout-button">Checkout</a>
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
  const container = document.getElementById('products-container');
  container.innerHTML = ''; // Clear existing
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

/**
 * Displays an error message.
 * @param {string} message - The error message.
 */
function showError(message) {
  const container = document.getElementById('products-container');
  container.innerHTML = `<p class="error-message">${message}</p>`;
}

/**
 * Initializes the product loading.
 */
async function initProducts() {
  try {
    const products = await fetchNotebooks();
    renderProducts(products);
  // init tilt on freshly rendered images
  initTilt();
  } catch (error) {
    showError('Failed to load products. Please try again later.');
  }
}

// Load products on page load
document.addEventListener('DOMContentLoaded', initProducts);