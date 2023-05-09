import { getStorageItem, setStorageItem } from './utils.js';

let store = getStorageItem('store');
// console.log(store);

const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      title,
      price,
      category,
      image,
      rating: { rate },
    } = product;
    return { id, title, price, category, image, rate };
  });
  setStorageItem('store', store);
};

const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  // console.log('found product');
  // console.log(product);
  return product;
};

export { store, setupStore, findProduct };
