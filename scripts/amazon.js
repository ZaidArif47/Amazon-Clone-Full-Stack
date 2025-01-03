import { cart } from "../data/cart-class.js";
import { products, loadProducts } from "../data/products.js";

//Call loadProducts and pass renderProductGrid as the callback
loadProducts(renderProductGrid);

// define a callback function that will render products
function renderProductGrid() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  let filteredProducts = products;

  if(searchQuery) {
    document.querySelector('.js-search-bar').value = searchQuery;

    // If a searchQuery exists in the URL parameters, filter the products that match the search.
    filteredProducts = products.filter((value) => {
      let matchingKeyword = false;
      value.keywords.forEach((keyword) => {
        if(keyword.toLowerCase().includes(searchQuery.toLowerCase())) {
          matchingKeyword = true;
        };
      });
      return matchingKeyword || value.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  let productsHTML = '';

  filteredProducts.forEach((product) => {
      productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <!-- Polymorphism - use a method without knowing the class 
            Instead of using an if statement or ternary operator; the class will determine what this method does -->
            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  updateCartQuantity();

  //https://chatgpt.com/c/ef977b25-8a9f-4d5f-9a58-29e65054c58a
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  
    //We use a feature of JavaScript called a closure. 
    //Each time we run the loop, it will create a new variable called addedMessageTimeoutId and do button.addEventListener()
    // Then, because of closure, the function we give to button.addEventListener() will get a unique copy
      // of the addedMessageTimeoutId variable and it will keep this copy of the variable forever.
    //(Reminder: closure = if a function has access to a value/variable, it will always have access to that value/variable).
    
    //This allows us to create many unique copies of the addedMessageTimeoutId variable (one for every time we run the loop) 
    // so it lets us keep track of manytimeoutIds (one for each product). 
  let addedMessageTimeoutId;

    button.addEventListener('click', () => {
      //const productId = button.dataset.productId;
      const { productId } = button.dataset;
      
      let productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      
      cart.addToCart(productId, productQuantity);
      updateCartQuantity();
        
      let addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCartElement.classList.add('js-added-to-cart');

      //Check if a previous timeoutId exists. If it does, we will stop it.
      if(addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }
      
      let timeoutId = setTimeout(() => {
        addedToCartElement.classList.remove('js-added-to-cart');
      }, 2000);

      //Save the timeoutId so we can stop it later.
      addedMessageTimeoutId = timeoutId;

    })
  });

  document.querySelector('.js-search-button').addEventListener('click', () => {
    let searchParams = document.querySelector('.js-search-bar').value;
    window.location.href = `http://127.0.0.1:5500/amazon.html?search=${searchParams}`;
  });
  
  document.querySelector('.js-search-bar').addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
      let searchParams = document.querySelector('.js-search-bar').value;
      window.location.href = `http://127.0.0.1:5500/amazon.html?search=${searchParams}`;
    };
  });

}