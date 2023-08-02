const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
setTimeout(function() {
    localStorage.removeItem('authToken');
  }, twoDaysInMillis);

let productsHTML='';
products.forEach((product) =>{
    productsHTML += `
            <div class="product-container">
            <div class="product-image-container">
            <img class="product-image js-image${product.id}"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines js-name${product.id}">${product.name}</div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
        </div>

        <div class="product-price js-price${product.id}">Rs ${(product.priceCents/100).toFixed(2)}</div>

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

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"  data-product-id="${product.id}">
            Add to Cart
        </button>
        </div>
    `;
});
document.querySelector(".js-products-grid").innerHTML=productsHTML;

let cartQuantity = JSON.parse(localStorage.getItem("cartQuantity")) || 0;

document.querySelector(".js-cart-quantity").innerHTML= cartQuantity;

//date for delivery

const currentDateObj = new Date();
currentDateObj.setDate(currentDateObj.getDate() + 1); //delivery after 1 days.
let first_delivery_day = currentDateObj.toLocaleString('en-US', { weekday: 'short' });
let first_delivery_date = currentDateObj.toLocaleString('en-US', { day: 'numeric' });
let first_delivery_month = currentDateObj.toLocaleString('en-US', { month: 'short' });
const firstDeliverydate = (`${first_delivery_day}, ${first_delivery_month} ${first_delivery_date}`);

currentDateObj.setDate(currentDateObj.getDate() + 5); //delivery after 5 days.
let fifth_delivery_day = currentDateObj.toLocaleString('en-US', { weekday: 'short' });
let fifth_delivery_date = currentDateObj.toLocaleString('en-US', { day: 'numeric' });
let fifth_delivery_month = currentDateObj.toLocaleString('en-US', { month: 'short' });
const fifthDeliverydate = (`${fifth_delivery_day}, ${fifth_delivery_month} ${fifth_delivery_date}`);

currentDateObj.setDate(currentDateObj.getDate() + 7); //delivery after 7 days.
let free_delivery_day = currentDateObj.toLocaleString('en-US', { weekday: 'short' });
let free_delivery_date = currentDateObj.toLocaleString('en-US', { day: 'numeric' });
let free_delivery_month = currentDateObj.toLocaleString('en-US', { month: 'short' });
const freeDeliverydate = (`${free_delivery_day}, ${free_delivery_month} ${free_delivery_date}`);


let timeoutId; 
document.querySelectorAll(".js-add-to-cart").forEach((button) =>{
    button.addEventListener('click',() =>{
        const productId=button.dataset.productId;

        const product_image = document.querySelector(`.js-image${productId}`).src;
        const product_name = document.querySelector(`.js-name${productId}`).textContent;
        const product_price = document.querySelector(`.js-price${productId}`).textContent;
        
        const moneyFloat = parseFloat(product_price.replace("Rs", ""));
        const moneyInCents = Math.round(moneyFloat * 100);
        const product_price_cents = moneyInCents;

        const product_quantity= parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value);

        const added_message = document.querySelector(`.js-added-to-cart-${productId}`)
        let matchingItem;
        cart.forEach((item)=>{
            if(productId===item.productId){
                matchingItem=item;
            }
        });
        if(matchingItem){
            matchingItem.quantity +=product_quantity;
        }else{
            cart.push({
                productId: productId,
                productName: product_name,
                productImage: product_image,
                productPrice: product_price,
                productPriceCents: product_price_cents,
                quantity: product_quantity,
                freeDeliverydate: freeDeliverydate,
                firstDeliverydate: firstDeliverydate,
                fifthDeliverydate: fifthDeliverydate,
                choosed_date:""
            });
        }

        let cartQuantity = 0;
        cart.forEach((item) =>{
            cartQuantity += item.quantity;
        })
        added_message.classList.add("js-added-to-cart-display");

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
        added_message.classList.remove("js-added-to-cart-display");
        }, 1000);

        document.querySelector(".js-cart-quantity").innerHTML= cartQuantity;

        localStorage.setItem("cartQuantity",(JSON.stringify(cartQuantity)));

        localStorage.setItem("cart",(JSON.stringify(cart)));
    });
});

const account = document.querySelector(".account");
account.addEventListener('click',()=>{
    const menuItems = document.querySelector(".menu-items");
    if (menuItems.style.display === "block") {
      menuItems.style.display = "none";
    } else {
      menuItems.style.display = "block";
    }
});

const logout = document.querySelector(".log-out");
logout.addEventListener('click',()=>{
    localStorage.removeItem('authToken');
    location.reload();
});
