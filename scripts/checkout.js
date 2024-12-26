import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
    try {
        // throw 'error1'
        await loadProductsFetch();

        //loadCart - asynchronous & callback function - so wrap in a promise then await
        await new Promise((resolve, reject) => {
            // throw 'error2'
            loadCart(() => {
                // reject();
                resolve();
            });
        });

    } catch (error) {
        console.log('Error in Promise. Please try again.');
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();