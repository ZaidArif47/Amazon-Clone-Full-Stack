import { Product, Clothing, Appliances } from "../../data/products.js";

describe('test suite: Product class', () => {
    let product;

    beforeEach(() => {    
        product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: [
            "socks",
            "sports",
            "apparel"
            ]
          });
    });

    it('gets the correct properties', () => {
        expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    });

    it('gets the correct price', () => {
        expect(product.getPrice()).toEqual('$10.90');
    });

    it('gets the correct star url', () => {
        expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    });

    it('shows correct extra info', () => {
        expect(product.extraInfoHTML()).toEqual('')
    });
});


describe('test suite: Clothing Class', () => {
    let cloth;

    beforeEach(() => {
        cloth = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
              stars: 4.5,
              count: 56
            },
            priceCents: 799,
            keywords: [
              "tshirts",
              "apparel",
              "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
          })
    });

    it('gets the correct properties', () => {
        expect(cloth.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cloth.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    });

    it('gets the correct price', () => {
        expect(cloth.getPrice()).toEqual('$7.99');
    });

    it('gets the correct star url', () => {
        expect(cloth.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    });

    it('shows correct extra info', () => {
        expect(cloth.extraInfoHTML()).toEqual(`<a href="${cloth.sizeChartLink}" target="_blank">Size Chart</a>`);
    });
});


describe('test suite: Appliances Class', () => {
    let appliance;
    
    beforeEach(() => {
        appliance = new Appliances({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
            stars: 5,
            count: 2197
            },
            priceCents: 1899,
            keywords: [
            "toaster",
            "kitchen",
            "appliances"
            ],
            type: "appliances",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        })
    });

    it('gets the correct properties', () => {
        expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
        expect(appliance.name).toEqual("2 Slot Toaster - Black");
    });

    it('gets the correct price', () => {
        expect(appliance.getPrice()).toEqual('$18.99');
    });

    it('gets the correct star url', () => {
        expect(appliance.getStarsUrl()).toEqual('images/ratings/rating-50.png');
    });

    it('shows correct extra info', () => {
        expect(appliance.extraInfoHTML()).toContain('Warranty');
        expect(appliance.extraInfoHTML()).toContain('Instructions');
        expect(appliance.extraInfoHTML()).toContain('href="images/appliance-warranty.png"');
        expect(appliance.extraInfoHTML()).toContain('href="images/appliance-instructions.png"');
    });
})