export const cart = [];

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