import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupFilterCategories = (store) => {
  let categories = [
    'all',
    ...new Set(store.map((product) => product.category)),
  ];

  const categoriesDOM = getElement('.categories');
  categoriesDOM.innerHTML = categories
    .map((category) => {
      return `<button class="category-btn">${category}</button>`;
    })
    .join('');

  categoriesDOM.addEventListener('click', function (e) {
    const element = e.target;
    if (element.classList.contains('category-btn')) {
      let newStore = [];
      if (element.textContent === 'all') {
        newStore = [...store];
      } else {
        newStore = store.filter(
          (product) => product.category === element.textContent
        );
      }
      display(newStore, getElement('.products-container'), true);
    }
  });
};

export default setupFilterCategories;
