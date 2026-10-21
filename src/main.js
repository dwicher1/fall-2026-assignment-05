import products from './data/products.json';

// Find the HTML elements that JavaScript will update.
const productGrid = document.querySelector('#product-grid');
const productCount = document.querySelector('#product-count');
const pageIndicator = document.querySelector('#page-indicator');
const previousButton = document.querySelector('#prev-page');
const nextButton = document.querySelector('#next-page');

// Track which products should be displayed.
const PRODUCTS_PER_PAGE = 5;
const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
let currentPage = 1;

// Format numeric prices as US dollars.
const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Build one product card using an object from the JSON file.
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.productId = product.id;

  const image = document.createElement('img');
  image.className = 'product-image';
  image.src = product.imageUrl;
  image.alt = product.name;
  image.loading = 'lazy';

  const category = document.createElement('p');
  category.className = 'product-category';
  category.textContent = product.category;

  const heading = document.createElement('div');
  heading.className = 'product-heading';

  const name = document.createElement('h3');
  name.className = 'product-name';
  name.textContent = product.name;

  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = priceFormatter.format(product.price);

  const description = document.createElement('p');
  description.className = 'product-description';
  description.textContent = product.description;

  heading.append(name, price);
  card.append(image, category, heading, description);

  return card;
}

// Display the current page and update its controls.
function renderProducts() {
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, products.length);

  const pageProducts = products.slice(startIndex, endIndex);

  // Remove the previous page's cards.
  productGrid.replaceChildren();

  // Add a card for each product on this page.
  pageProducts.forEach((product) => {
    productGrid.append(createProductCard(product));
  });

  productCount.textContent = `Showing ${startIndex + 1}–${endIndex} of ${products.length} products`;

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Move backward, stopping at the first page.
previousButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderProducts();
  }
});

// Move forward, stopping at the last page.
nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage += 1;
    renderProducts();
  }
});

// Display the first page when the Store loads.
renderProducts();
