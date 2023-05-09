import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const categoryDOM = getElement('.single-product-category');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  let urlID = window.location.search;
  const justID = urlID.split('=')[1];
  // console.log(justID);
  try {
    const singleUrl = `${singleProductUrl}${justID}`;
    // console.log(singleUrl);
    const response = await fetch(`${singleProductUrl}${justID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      const { id, title, price, description, image, category } = product;
      productID = id;
      // console.log(title);

      document.title = `${title.toUpperCase()} | Two Brothers`;
      pageTitleDOM.textContent = `Home / ${title}`;
      imgDOM.src = image;
      titleDOM.textContent = title;
      categoryDOM.textContent = category;
      priceDOM.textContent = `$${price}`;
      descDOM.textContent = description;
    } else {
      centerDOM.innerHTML = `<div>
    <h3 class="error">sorry, something went wrong</h3>
    <a href="index.html" class="btn">back home</a> 
    </div>`;
    }
  } catch (error) {
    console.log(error);
  }
  loading.style.display = 'none';
});

cartBtn.addEventListener('click', () => {
  addToCart(productID);
});
