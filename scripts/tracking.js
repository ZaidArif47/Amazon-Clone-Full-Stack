import { getOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

async function loadTrackingPage() {
    await loadProductsFetch();

    let url = new URL(window.location.href);
    let orderId = url.searchParams.get('orderId');
    let productId = url.searchParams.get('productId');

    let matchingOrder = getOrder(orderId);
    let myProduct = getProduct(productId);

    let matchingProduct;
    matchingOrder.products.forEach((productDetail) => {
        if(productDetail.productId === myProduct.id){
            matchingProduct = productDetail;
        }
    });

    let orderTime = dayjs(matchingOrder.orderTime);
    let deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);
    let currentTime = dayjs();

    let orderProgress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
    console.log(orderProgress);

    let html = `
        <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
        </a>

        <div class="delivery-date">
        Arriving on ${dayjs(matchingProduct.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
        ${myProduct.name}
        </div>

        <div class="product-info">
        Quantity: ${matchingProduct.quantity}
        </div>

        <img class="product-image" src="${myProduct.image}">

        <div class="progress-labels-container">
        <div class="progress-label status-preparing ${(orderProgress < 50) ? 'current-status' : '' }">
            Preparing
        </div>
        <div class="progress-label ${(orderProgress >= 50 && orderProgress < 100) ? 'current-status' : '' }">
            Shipped
        </div>
        <div class="progress-label ${(orderProgress >= 100) ? 'current-status' : '' }">
            Delivered
        </div>
        </div>

        <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar"></div>
        </div>
    `;
    
    document.querySelector('.js-order-tracking').innerHTML = html;
    document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();

    document.querySelector('.js-progress-bar').style.width = `${orderProgress}%`;
};
loadTrackingPage();