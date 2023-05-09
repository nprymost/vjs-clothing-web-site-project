import { getStorageItem, setStorageItem, getElement } from '../utils.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
import { openCart } from './toggleCart.js';

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');
// console.log(cart);

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);
  // console.log(item);
  if (!item) {
    // find at the store
    let product = findProduct(id);
    //add to cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    //add item to the DOM
    addToCartDOM(product);
    // console.log(cart);
  } else {
    //update values
    const amount = increaseAmount(id);
    // console.log(cartItemsDOM);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    // console.log(items);
    const newAmount = items.find((value) => {
      const intgId = parseInt(value.dataset.id);
      return intgId === id;
    });
    newAmount.textContent = amount;
  }
  displayCartItemCount();
  displayCartTotal();
  setStorageItem('cart', cart);
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total : $${total.toFixed(2)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== parseInt(id));
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      // to remove from DOM
      parent.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parseInt(parentID));
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parseInt(parentID));
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

const init = () => {
  displayCartItemCount();
  displayCartTotal();
  displayCartItemsDOM();
  setupCartFunctionality();
};

init();
