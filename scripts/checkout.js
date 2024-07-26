import { cart, deleteFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateCartQuantity();

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

const productId = cartItem.productId;

let matchingProduct;

products.forEach(product => {
    if(product.id === productId) {
        matchingProduct = product;
    } 
});

cartSummaryHTML+= 
`
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.productQuantity}</span>
            </span>
            <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Update
            </span>
            <input class="quantity-input js-product-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
</div>
`;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link').
  forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
        const itemId = deleteLink.dataset.productId;
        deleteFromCart(itemId);
        const container = document.querySelector(`.js-cart-item-container-${itemId}`);
        container.remove();  //updating the HTML after deleting from Cart
        updateCartQuantity();
    });
});

function updateCartQuantity() {
  let cartQuantity = calculateCartQuantity();  
  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}


document.querySelectorAll('.update-quantity-link').
  forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
        const productId = updateLink.dataset.productId;
        const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        productContainer.classList.add('is-editing-quantity');

        document.querySelector(`.js-product-input-${productId}`).
         addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                saveQuantity(productId);
            };
         });
    });
  });


  document.querySelectorAll('.js-save-link').
   forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
        const productId = saveLink.dataset.productId;
        saveQuantity(productId);    
    });
   });


   function saveQuantity(productId) {
    const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    productContainer.classList.remove('is-editing-quantity');
        
    const quantityInput = document.querySelector(`.js-product-input-${productId}`);
    const newQuantity = Number(quantityInput.value);
        if (newQuantity <= 0 || newQuantity > 100) {
            alert('Quantity must be at least 0 and less than 100');
            return;
        }

    updateQuantity(productId, newQuantity);

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    updateCartQuantity();
   };