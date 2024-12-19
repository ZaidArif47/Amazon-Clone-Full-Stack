import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    let allProductsPrice = 0;
    let allShippingPrice = 0;

    cart.cartItems.forEach((cartItem) => {
        let product = getProduct(cartItem.productId);
        allProductsPrice += product.priceCents * cartItem.productQuantity;
        
        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        allShippingPrice += deliveryOption.priceCents; 
    })
      
    let totalPriceBeforeTax = allProductsPrice + allShippingPrice;
    let taxAmount = totalPriceBeforeTax * 0.1;
    let totalPriceAfterTax = totalPriceBeforeTax + taxAmount;

    let paymentSummaryHTML;

    paymentSummaryHTML = 
    `
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${cart.calculateCartQuantity()}):</div>
    <div class="payment-summary-money">$${formatCurrency(allProductsPrice)}</div>
    </div>

    <div class="payment-summary-row js-payment-summary-shipping">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(allShippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalPriceBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxAmount)}</div>
    </div>

    <div class="payment-summary-row total-row js-payment-summary-total">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalPriceAfterTax)}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>
    `

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}