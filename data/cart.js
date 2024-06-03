export let cart = [
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    }, 
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];

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
        productQuantity //shorthand property
       });
      }   
  }

 export function deleteFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.id !== productId) {
            newCart.push(cartItem);
        };
    });

    cart = newCart;
  };

  