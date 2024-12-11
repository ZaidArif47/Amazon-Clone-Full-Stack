const cart = {
    cartItems: undefined,

    
    loadFromStorage: function() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [
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
    },


    saveToStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },


    addToCart(productId, productQuantity) {
        let productFound = false;
      
        this.cartItems.forEach((value) => {
          if(productId === value.productId) {
            productFound = true;
            value.productQuantity += productQuantity;
          }
         });
              
         if(!productFound) {
          this.cartItems.push({
            productId, //shorthand property
            productQuantity, //shorthand property
            deliveryOptionId: '1'
           });
          }   
    
          this.saveToStorage();
      },


      deleteFromCart(productId) {
        let newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            };
        });
    
        this.cartItems = newCart;
    
        this.saveToStorage();
      },


      calculateCartQuantity() {
        let cartQuantity = 0;
      
        this.cartItems.forEach((value) => {
         cartQuantity += value.productQuantity;
        });
      
        return cartQuantity;
        },    

        
        updateQuantity(productId, newQuantity) {
            this.cartItems.forEach((value) => {
                if (productId === value.productId ) {
                    value.productQuantity = newQuantity;
                };
            });
        
            this.saveToStorage();
          },


          updateDeliveryOptions(productId, deliveryOption) {
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
        
            if(!matchingItem) {
                return;
            }
        
            matchingItem.deliveryOptionId = deliveryOption;
        
            this.saveToStorage();
          },
}

cart.loadFromStorage();
console.log(cart);