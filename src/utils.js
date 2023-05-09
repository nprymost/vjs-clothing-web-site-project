const allProductsUrl = 'https://fakestoreapi.com/products';

// need id at the end
// example https://fakestoreapi.com/products/1
const singleProductUrl = 'https://fakestoreapi.com/products/';

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
};

const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

// const formatPrice = (price) => {
//   let fromattedPrice = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format((price / 100).toFixed(2));
//   return fromattedPrice;
// };

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  getStorageItem,
  setStorageItem,
  // formatPrice,
};
