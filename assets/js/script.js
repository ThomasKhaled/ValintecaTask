class Product {
  constructor({ product_name, product_price, product_image, added_to_cart }) {
    this.product_name = product_name;
    this.product_price = product_price;
    this.product_image = product_image;
    this.added_to_cart = added_to_cart;
  }
}


//initialization
const productsSection = document.getElementById('products');
const cartDropdown = document.getElementsByClassName('dropdown')[0];
const cartNum = document.querySelector('#cart');
const cartContent = document.createElement('div');
let products = [];
let numberOfAddedProducts = 0;
function handleProductsInitialization()  {
  cartContent.className= 'cart-list';
  cartContent.style.visibility = 'hidden';
  cartNum.setAttribute('NumberOfElementsInCart', 0);
  cartNum.appendChild(cartContent);
  if (localStorage.getItem("products") !== null) {
    products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
  } else {
    products.push(
      new Product({
        product_name: "Gold Coin",
        product_price: "112.55",
        product_image: "gold-coin.jpg",
        added_to_cart: false,
      })
    );
    products.push(
      new Product({
        product_name: "White Hoodie",
        product_price: "250.99",
        product_image: "white-hoodie.jpg",
        added_to_cart: false,
      })
    );
    products.push(
      new Product({
        product_name: "Jeans",
        product_price: "199.99",
        product_image: "jeans.jpg",
        added_to_cart: false,
      })
    );
    products.push(
      new Product({
        product_name: "Sneakers",
        product_price: "314.42",
        product_image: "sneakers.jpg",
        added_to_cart: false,
      })
    );
    products.push(
      new Product({
        product_name: "Spatula",
        product_price: "22.48",
        product_image: "spatula.jpg",
        added_to_cart: false,
      })
    );
    products.push(
      new Product({
        product_name: "Coffee Machine",
        product_price: "792.88",
        product_image: "coffee.jpg",
        added_to_cart: false,
      })
    );
    localStorage.setItem("products", JSON.stringify(products));
  }

  //handling the dropdown list
  cartDropdown.addEventListener('click',()=>{
    console.log('sadsa')
    const cartList = document.getElementsByClassName('cart-list')[0];
    if(cartList.style.visibility === 'hidden')
      cartList.style.visibility = 'visible';
    else  
      cartList.style.visibility = 'hidden';
  });
}
handleProductsInitialization();

//displaying all the products
function creatingProducts(){
    for(let i = 0; i<products.length; i++) {
        const productDiv = document.createElement('div');
        const buttonsDiv = document.createElement('div');
        const prodImg = document.createElement('img');
        const addToCartBtn = document.createElement('button');
        const quickViewBtn = document.createElement('button');
        const productName = document.createElement('p');
        const productPrice = document.createElement('span');

        productName.textContent = products[i].product_name;
        productPrice.textContent = `EGP ${products[i].product_price}`;
        if(products[i].added_to_cart){
          addToCartBtn.className = 'add remove';
          addToCartBtn.textContent = 'Remove From Cart';
          numberOfAddedProducts++;
          cartNum.setAttribute('NumberOfElementsInCart',numberOfAddedProducts);
          const cartItemDiv = document.createElement('div');
          const itemName = document.createElement('span');
          const removeBtn = document.createElement('button');
          itemName.textContent = products[i].product_name;
          removeBtn.textContent = 'Remove';
          removeBtn.className = 'cart-remove-button';
          cartItemDiv.className = `p-${i+1}`;
          cartItemDiv.appendChild(itemName);
          cartItemDiv.appendChild(removeBtn);
          cartContent.appendChild(cartItemDiv);
        }else {
          addToCartBtn.className = 'add';
          addToCartBtn.textContent = 'Add To Cart';
        }
        
        quickViewBtn.textContent = 'Quick View'
        prodImg.src = `assets/imgs/${products[i].product_image}`;
        
        productDiv.className = `product${i+1}`;;
        prodImg.className = `prod-img`;
        productName.className = 'product-name';
        productPrice.className = 'product-price';
        buttonsDiv.className = 'product-buttons';
        quickViewBtn.className = 'quick-view';

        
        productDiv.appendChild(prodImg);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(buttonsDiv);
        buttonsDiv.appendChild(addToCartBtn);
        buttonsDiv.appendChild(quickViewBtn);
        productsSection.appendChild(productDiv);
    }
}
creatingProducts();


//Updating number of elements in cart UI
function getNumOfAddedproducts(){
    numberOfAddedProducts = 0;
    for(let i=0; i<products.length; i++) {
        if(products[i].added_to_cart)
            numberOfAddedProducts++;
    }
    if(numberOfAddedProducts < 1){
      cartNum.setAttribute('NumberOfElementsInCart', 0);
      cartContent.style.visibility = 'hidden';
    }
    cartNum.setAttribute('NumberOfElementsInCart',numberOfAddedProducts);
}


//Adding & removing elements from the cart
function handleAddToCart(){
  document.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.classList.contains('add')){
        e.target.classList.toggle('remove');
        let productIDX = e.target.parentNode.parentNode.className.split(' ')[0];
        productIDX = productIDX[productIDX.length-1];
        if(e.target.textContent === 'Add To Cart'){
          console.log(productIDX)
            products[productIDX-1].added_to_cart = true;
            getNumOfAddedproducts();
            localStorage.setItem("products", JSON.stringify(products));
            e.target.textContent = 'Remove From Cart';
          const cartItemDiv = document.createElement('div');
          const itemName = document.createElement('span');
          const removeBtn = document.createElement('button');
          itemName.textContent = products[productIDX-1].product_name;
          removeBtn.textContent = 'Remove';
          removeBtn.className = 'cart-remove-button';
          cartItemDiv.className = `p-${productIDX}`;
          cartItemDiv.appendChild(itemName);
          cartItemDiv.appendChild(removeBtn);
          cartContent.appendChild(cartItemDiv);
        }
        else{
            products[productIDX-1].added_to_cart = false;
            getNumOfAddedproducts();
            localStorage.setItem("products", JSON.stringify(products));
            e.target.textContent = 'Add To Cart';   
            const productToBeRemoved = document.getElementsByClassName(`p-${productIDX}`)[0];
            productToBeRemoved.remove(); 
        } 
    }
    
    if(e.target.classList.contains('cart-remove-button')){
      const productNum = e.target.parentNode.className[e.target.parentNode.className.length-1];
      products[productNum-1].added_to_cart = false;
      localStorage.setItem("products", JSON.stringify(products));
      getNumOfAddedproducts();
      const productToBeRemoved = document.getElementsByClassName(e.target.parentNode.className)[0];
      productToBeRemoved.remove();
      const productToBeChanged = document.querySelector(`.product${productNum} .remove`);
      productToBeChanged.classList.toggle('remove');
      productToBeChanged.textContent = 'Add To Cart'; 
      if(numberOfAddedProducts >= 1){
        const cartList = document.getElementsByClassName('cart-list')[0];
        cartList.style.visibility = 'visible';
      }
    }
    
});
}
handleAddToCart();


//Creating quick view UI
function quickViewModel(){
  const quickViewSec = document.getElementById('quick-view');
  const exitBtn = document.createElement('span');
  const overlay = document.getElementById('overlay');
  exitBtn.className = 'quick-view-exit';
  exitBtn.textContent = 'X';
  quickViewSec.appendChild(exitBtn);
  exitBtn.addEventListener('click',()=>{
    quickViewSec.innerHTML = '';
    exitBtn.className = 'quick-view-exit';
    exitBtn.textContent = 'X';
    quickViewSec.appendChild(exitBtn);
    quickViewSec.classList.remove('center-quick-view');
    overlay.style.display = 'none';
  });
  document.addEventListener('click', function(e){
    if(e.target.classList.contains('quick-view')){
      const product = e.target.parentNode.parentNode;
      const productNewDiv = document.createElement('div');
      productNewDiv.className = `${e.target.parentNode.parentNode.className} product-quick-view`;
      quickViewSec.classList.add('center-quick-view');
      productNewDiv.innerHTML = product.innerHTML;
      quickViewSec.appendChild(productNewDiv);
      
      const quickViewBtn = document.querySelector(`.product-quick-view .quick-view`);
      console.log(quickViewBtn);
      quickViewBtn.style.display = 'none';
      overlay.style.display = 'block';

    }
  });
}
quickViewModel();
