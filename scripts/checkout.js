import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
    try {
        await Promise.all([
            loadProductsFetch(), loadCartFetch()
        ]);

    } catch (error) {
        console.log('Error in Promise. Please try again.');
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();