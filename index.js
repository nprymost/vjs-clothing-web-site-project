import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
import './src/toggleSidebar.js';

import { getElement } from './src/utils.js';
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    // add products to the local storage store
    setupStore(products);
    const topRated = store.filter((product) => product.rate > 4.6);
    display(topRated, getElement('.top-rated-center'));
  }
};

window.addEventListener('DOMContentLoaded', init);
