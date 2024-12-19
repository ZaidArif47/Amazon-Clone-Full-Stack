import { cart } from "../../data/cart-class.js";

describe('test suite: addToCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        cart.cartItems = [{
            productId: productId1,
            productQuantity: 2,
            deliveryOptionId: '1'
        }]
    });

    it('adds an existing product to cart', () => {        
        cart.addToCart(productId1, 1);
                
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].productQuantity).toEqual(3);      
    });


    it('adds a new product to cart', () => {
        cart.addToCart(productId2, 1);
        
        expect(cart.cartItems.length).toEqual(2);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.cartItems[0].productQuantity).toEqual(2)
        expect(cart.cartItems[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.cartItems[1].productQuantity).toEqual(1);
    });
});


describe('test suite: deleteFromCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        cart.cartItems = [{
            productId: productId1,
            productQuantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: productId2,
            productQuantity: 1,
            deliveryOptionId: '2'
        }];
    });

    it('removes an existing product from cart', () => {
        cart.deleteFromCart(productId1);
        
        expect(cart.cartItems.length).toEqual(1);     
    });

    it('removing a product that is not in the cart, cart is unhinged', () => {
        cart.deleteFromCart('random-id');

        expect(cart.cartItems.length).toEqual(2);
    });
});


describe('test suite: updateDeliveryOptions', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        cart.cartItems = [{
            productId: productId1,
            productQuantity: 2,
            deliveryOptionId: '1'
        }];
    });

    it('updates the delivery option of item in cart', () => {    
        cart.updateDeliveryOptions(productId1, '3');

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    });

    it('does not update delivery option if item is not in the cart', () => {
        cart.updateDeliveryOptions(productId2, '3');

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    });
});