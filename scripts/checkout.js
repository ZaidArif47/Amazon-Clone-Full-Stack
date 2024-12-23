import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";

/*
async function loadPage() {
    console.log('Load Page');   

    await loadProductsFetch();

    return 'testValue'; 
}
loadPage().then((value) => {
    console.log('Next step from async');
    console.log(value);
})
*/

async function loadPage() {
    await loadProductsFetch();

    //loadCart - asynchronous & callback function - so wrap in a promise then await
    await new Promise((resolve) => {
        loadCart(resolve);
    });

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),    
    
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    console.log(values);

    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });
})

.then((value) => {
    console.log(value);

    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
})

.then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/