import { cart, loadFromStorage, addToCart, deleteFromCart, updateDeliveryOptions } from "../../data/cart.js";

describe('test suite: addToCart', () => {

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                productQuantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
                
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].productQuantity).toEqual(2);
        
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            productQuantity: 2,
            deliveryOptionId: '1'
        }]));        
    });


    it('adds a new product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].productQuantity).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            productQuantity: 1,
            deliveryOptionId: '1'
        }]));
    });

});


describe('test suite: deleteFromCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('removes an existing product from cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    productQuantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    productQuantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage();

        deleteFromCart(productId1);
        
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: productId2,
                productQuantity: 1,
                deliveryOptionId: '2'
            }
        ]));
        
    });

    it('removing a product that is not in the cart, cart is unhinged', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    productQuantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    productQuantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage();

        deleteFromCart('random-id');

        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: productId1,
                productQuantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: productId2,
                productQuantity: 1,
                deliveryOptionId: '2'
            }
        ]));
    });

});


describe('test suite: updateDeliveryOptions', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    productQuantity: 2,
                    deliveryOptionId: '1'
                }
            ])
        });
        loadFromStorage();
    });

    it('updates the delivery option of item in cart', () => {    
        updateDeliveryOptions(productId1, '3');

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: productId1,
                productQuantity: 2,
                deliveryOptionId: '3'
            }
        ]));
    });

    it('does not update delivery option if item is not in the cart', () => {
        updateDeliveryOptions(productId2, '3');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
    })

});