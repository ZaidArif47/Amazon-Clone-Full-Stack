import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import { getProduct, loadProductsFetch } from '../data/products.js';

export async function renderPage() {
    await loadProductsFetch();

    let orderGridHTML = '';

    orders.forEach((order) => {
        let orderDateString = dayjs(order.orderTime).format('MMMM D');
        let orderTotal = '$' + formatCurrency(order.totalCostCents);
        let orderId = order.id;
        console.log(orderDateString);
        console.log(orderTotal);

    orderGridHTML += `
    <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${orderTotal}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderOrderDetails(order)}
          </div>
        </div>
    `;
    });

    function renderOrderDetails(order) {
        let html = '';

        order.products.forEach((productDetails) => {
            let product = getProduct(productDetails.productId);
            
            let deliveryTime = dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
    
            html += `
            <div class="product-image-container">
                  <img src=${product.image}>
                </div>
    
                <div class="product-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-delivery-date">
                    Arriving on: ${deliveryTime}
                  </div>
                  <div class="product-quantity">
                    Quantity: ${productDetails.quantity}
                  </div>
                  <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </div>
    
                <div class="product-actions">
                  <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                    <button class="track-package-button button-secondary">
                      Track package
                    </button>
                  </a>
                </div>
            `;
        });
        return html;
    }

    document.querySelector('.js-orders-grid').innerHTML = orderGridHTML;
}
renderPage();