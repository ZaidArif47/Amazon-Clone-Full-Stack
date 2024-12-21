export let cart;

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            productQuantity: 2,
            deliveryOptionId: '1' 
        }, 
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            productQuantity: 1,
            deliveryOptionId: '2'
        }
    ];
};

loadFromStorage();

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productQuantity) {
    let productFound = false;
  
    cart.forEach((value) => {
      if(productId === value.productId) {
        productFound = true;
        value.productQuantity += productQuantity;
      }
     });
          
     if(!productFound) {
      cart.push({
        productId, //shorthand property
        productQuantity, //shorthand property
        deliveryOptionId: '1'
       });
      }   

      saveToStorage();
  }

 export function deleteFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        };
    });

    cart = newCart;

    saveToStorage();
  };

  export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((value) => {
   cartQuantity += value.productQuantity;
  })

  return cartQuantity;
  }

  export function updateQuantity(productId, newQuantity) {
    cart.forEach((value) => {
        if (productId === value.productId ) {
            value.productQuantity = newQuantity;
        };
    });

    saveToStorage();
  }


  export function updateDeliveryOptions(productId, deliveryOption) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if(!matchingItem) {
        return;
    }

    matchingItem.deliveryOptionId = deliveryOption;

    saveToStorage();
  }

  export function loadCart(callbackFunc) {
    let xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        callbackFunc();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }