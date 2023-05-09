import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

import setupSearch from '../filters/search.js';
import setupFilterCategories from '../filters/companies.js';
import setupPrice from '../filters/price.js';

import { setupStore, store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

import fetchProducts from '../fetchProducts.js';

const init = async () => {
  const loading = getElement('.page-loading');
  if (store.length < 1) {
    const products = await fetchProducts();
    setupStore(products);
  }
  display(store, getElement('.products-container'));

  setupSearch(store);
  setupFilterCategories(store);
  setupPrice(store);
  loading.style.display = 'none';
};

init();
