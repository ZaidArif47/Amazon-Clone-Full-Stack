import { cart, deleteFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOptions } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";


function renderOrderSummary() {

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

    let deliveryOption; 

    deliveryOptions.forEach((option) => {
        if(option.id === cartItem.deliveryOptionId){
            deliveryOption = option;
        }
    });

    let today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'Days');
    let dateString = deliveryDate.format('dddd, MMMM D');


    cartSummaryHTML+= 
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>
    `;
    });


    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            let today = dayjs();
            let deliveryDate = today.add(deliveryOption.deliveryDays, 'Days');
            let dateString = deliveryDate.format('dddd, MMMM D');
            let priceString = (deliveryOption.priceCents === 0) ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

            let isChecked = (deliveryOption.id === cartItem.deliveryOptionId) ? 'checked' : '';

        html +=
        `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
        `
        });
        return html;
    }


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


    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset; //shorthand property
                updateDeliveryOptions(productId, deliveryOptionId);
                renderOrderSummary();
            })
        })
}

renderOrderSummary();