
const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
setTimeout(function() {
    localStorage.removeItem('authToken');
  }, twoDaysInMillis);

let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);


let totalCartproduct=0;

let totalCost = 0;
let shippingCost = 0;
let totalBeforetax=0;
let estimatedTax =0;
let orderTotal = 0;

let totalCost_dollar=0;
let shippingCost_dollar=0;
let totalBeforetax_dollar = 0;
let estimatedTax_dollar=0;
let orderTotal_dollar=0;

if(cart){
let cart_productHTML='';
cart.forEach((cart_product) =>{

  const choosedDate = cart_product.choosed_date || cart_product.freeDeliverydate;
    const isFreeDelivery = choosedDate === cart_product.freeDeliverydate;
    const isFifthDelivery = choosedDate === cart_product.fifthDeliverydate;
    const isFirstDelivery = choosedDate === cart_product.firstDeliverydate;

    let partialShippingCost = 0; //to initialize the shipping cost for each products
    if (isFifthDelivery) {
      partialShippingCost = 10000;
    } else if (isFirstDelivery) {
      partialShippingCost = 20000; 
    } else {
      partialShippingCost = 0;
    }
    shippingCost +=partialShippingCost;

     cart_productHTML+= `
     <div class="cart-item-container">
     <div class="delivery-date js-upper-date-${cart_product.productId}" data-upperdelivery-date=${cart_product.productId}>
       Delivery date: ${cart_product.choosed_date || cart_product.freeDeliverydate}
     </div>

     <div class="cart-item-details-grid">
       <img class="product-image"
         src="${cart_product.productImage}">

       <div class="cart-item-details">
         <div class="product-name">
           ${cart_product.productName}
         </div>
         <div class="product-price">
           ${cart_product.productPrice}
         </div>

         <div class="product-quantity js-product-quantity-${cart_product.productId} " data-item-id="${cart_product.productId}"">
           <span>
             Quantity: <span class="quantity-label" data-item-id="${cart_product.productId}"">${cart_product.quantity}</span>
           </span>
           <span class="update-quantity-link link-primary js-update-button" data-item-id="${cart_product.productId}">
             Update
           </span>
           <span class="delete-quantity-link link-primary js-delete-button" data-item-id="${cart_product.productId}">
             Delete
           </span>
         </div>

       </div>

       <div class="delivery-options" data-delivery-option=${cart_product.productId}>
       <div class="delivery-options-title">
         Choose a delivery option:
       </div>
       <div class="delivery-option">
         <input type="radio" ${isFreeDelivery ? 'checked' : ''}
           class="delivery-option-input" data-option-id="${cart_product.productId}"
           name="delivery-option-${cart_product.productId}">
         <div>
           <div class="delivery-option-date" data-upperdelivery-date=${cart_product.productId}>
           ${cart_product.freeDeliverydate}
           </div>
           <div class="delivery-option-price">
             FREE Delivery
           </div>
         </div>
       </div>
       <div class="delivery-option">
         <input type="radio" ${isFifthDelivery ? 'checked' : ''}
           class="delivery-option-input" data-option-id="${cart_product.productId}"
           name="delivery-option-${cart_product.productId}">
         <div>
           <div class="delivery-option-date" data-upperdelivery-date=${cart_product.productId}>
           ${cart_product.fifthDeliverydate}
           </div>
           <div class="delivery-option-price">
             Rs 100 - Delivery
           </div>
         </div>
       </div>
       <div class="delivery-option">
         <input type="radio" ${isFirstDelivery ? 'checked' : ''}
           class="delivery-option-input" data-option-id="${cart_product.productId}"
           name="delivery-option-${cart_product.productId}">
         <div>
           <div class="delivery-option-date" data-upperdelivery-date=${cart_product.productId}>
           ${cart_product.firstDeliverydate}
           </div>
           <div class="delivery-option-price">
             Rs 200 - Delivery
           </div>
         </div>
       </div>
     </div>

     </div>
   </div>
     `
});

// console.log(cart_productHTML);
document.querySelector(".js-order-summary").innerHTML=cart_productHTML;


function calculateTotalProduct(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i].quantity;
    }
    return total;
  }
  
 totalCartproduct= calculateTotalProduct(cart);
  // console.log(totalCartproduct);
  localStorage.setItem("cartQuantity",(JSON.stringify(totalCartproduct)));


  function calculateTotalCost(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += (array[i].productPriceCents)*(array[i].quantity);
    }
    return total;
  }
  
 totalCost= calculateTotalCost(cart);
//  console.log(totalCost);

totalBeforetax = totalCost+shippingCost;
estimatedTax = parseFloat(((10/100)*totalBeforetax).toFixed(2));
orderTotal = totalBeforetax+estimatedTax;

totalCost_dollar = (totalCost/100).toFixed(2);
shippingCost_dollar = (shippingCost/100).toFixed(2);
totalBeforetax_dollar = (totalBeforetax/100).toFixed(2);
estimatedTax_dollar = (estimatedTax/100).toFixed(2);
orderTotal_dollar = (orderTotal/100).toFixed(2);

}

document.querySelector(".return-to-home-link").innerHTML=totalCartproduct+" items";

document.querySelector(".js-cart-quantity").innerHTML=`Items(${totalCartproduct})`;
document.querySelector(".js-total-cost").innerHTML=`Rs ${totalCost_dollar}`;
document.querySelector(".js-shipping-cost").innerHTML=`Rs ${shippingCost_dollar}`;
document.querySelector(".js-total-beforetax").innerHTML=`Rs ${totalBeforetax_dollar}`;
document.querySelector(".js-estimated-tax").innerHTML=`Rs ${estimatedTax_dollar}`;
document.querySelector(".js-order-total").innerHTML=`Rs ${orderTotal_dollar}`;


  const updateButton = document.querySelectorAll(".js-update-button").forEach((button) =>{
    button.addEventListener('click',() =>{
      const cart_productId=button.dataset.itemId;
      // console.log(cart_productId);
      // console.log(document.querySelector(`.js-product-quantity-${cart_productId}`));
      
      document.querySelector(`.js-product-quantity-${cart_productId}`).innerHTML=`
      <span>
        Quantity: <span class="quantity-label"><input type="number" class="js-new-quantity js-new-quantity-${cart_productId}"></span>
      </span>
      <span class="update-quantity-link link-primary js-save-button-${cart_productId}">
        Save
      </span>
      <span class="delete-quantity-link link-primary js-delete-button-${cart_productId}">
        Delete
      </span>
      `;

      const saveButton =document.querySelector(`.js-save-button-${cart_productId}`);
      saveButton.addEventListener('click',()=> {
        const newQuantity = parseInt(document.querySelector(`.js-new-quantity-${cart_productId}`).value);
        const parsedProductId = String(cart_productId.trim());

        const productToUpdate = cart.find(product => product.productId === parsedProductId);

        if (productToUpdate) {
          if (!isNaN(newQuantity) && newQuantity >= 0) {
              productToUpdate.quantity = newQuantity;

              localStorage.setItem("cart",(JSON.stringify(cart)));
              location.reload();
          }else{
              alert('Please input correct quantity');
          }
        }
      });

      const deleteButton =document.querySelector(`.js-delete-button-${cart_productId}`);
      deleteButton.addEventListener('click',()=> {

        const parsedProductId = String(cart_productId.trim());
        const productIndexToDelete = cart.findIndex(product => product.productId === parsedProductId);

        if (productIndexToDelete !== -1) {
          cart.splice(productIndexToDelete, 1);
        } 

        localStorage.setItem("cart",(JSON.stringify(cart)));
        location.reload();

      });
    });
    });

    const deleteButton = document.querySelectorAll(".js-delete-button").forEach((button) =>{
      button.addEventListener('click',() =>{
        const cart_productId=button.dataset.itemId;
        // console.log(cart_productId);

        const parsedProductId = String(cart_productId.trim());
        const productIndexToDelete = cart.findIndex(product => product.productId === parsedProductId);

        if (productIndexToDelete !== -1) {
          cart.splice(productIndexToDelete, 1);
        } 

        localStorage.setItem("cart",(JSON.stringify(cart)));
        location.reload();
      });
    });

  const radioButtons = document.querySelectorAll(".delivery-option-input");

    radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', () => {
        prodcutId_forDelivery= radioButton.dataset.optionId;

          if (radioButton.checked) {

              const optionDate = (radioButton.parentElement.querySelector('.delivery-option-date').textContent).trim();

              const dateToUpdate = cart.find(product => product.productId === prodcutId_forDelivery);
              if (dateToUpdate) {
                dateToUpdate.choosed_date = optionDate;
  
                localStorage.setItem("cart",(JSON.stringify(cart)));
                location.reload();
              }
          }
      });
  });


