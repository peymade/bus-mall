'use strict';

// All the product images

const results = document.getElementById('results');
const products = document.getElementById('total_products');
const leftProductImage = document.getElementById('left_product_img');
const centerProductImage = document.getElementById('center_product_img');
const rightProductImage = document.getElementById('right_product_img');
const leftProductP = document.getElementById('left_goat_p');
const rightProductP = document.getElementById('right_goat_p');
const buttonAdd = document.getElementById('buttonOne');

let totalClicks = 0;

let leftProduct = null;
let centerProduct = null;
let rightProduct = null;

function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.clicks = 0;
  this.timesShown = 0;

  Product.allProducts.push(this);
}


// Array with all products when they are created
Product.allProducts = [];

const renderProducts = function() {
  leftProductImage.src = leftProduct.imgPath;
  centerProductImage.src = centerProduct.imgPath;
  rightProductImage.src = rightProduct.imgPath;
}

function productSelector() {
  const leftIndex = Math.floor(Math.random() * Product.allProducts.length);

  let rightIndex = Math.floor(Math.random() * Product.allProducts.length);

  let centerIndex = Math.floor(Math.random() * Product.allProducts.length);

  console.log(Product.allProducts);

  // a different index number than the first one
  while (rightIndex === leftIndex){
   rightIndex = Math.floor(Math.random() * Product.allProducts.length);
  }
  while (centerIndex === rightIndex || centerIndex === leftIndex) {
    centerIndex = Math.floor(Math.random() * Product.allProducts.length);
  }

 //  GoatPictures.allImages[leftIndex]
 leftProduct = Product.allProducts[leftIndex];
 centerProduct = Product.allProducts[centerIndex];
 rightProduct = Product.allProducts[rightIndex];
}        


function displayVoteCount() {
  // remove current input and replace
  results.innerHTML = ' ';
  for (let i = 0; i < Product.allProducts.length; i++) {
    console.log(Product.allProducts[i]);
    const liElem = document.createElement('li');
    liElem.textContent = (Product.allProducts[i].name + ' had ' + Product.allProducts[i].clicks + ' votes, and was seen ' + Product.allProducts[i].timesShown + ' times.');
    results.appendChild(liElem);
  }
}

function handleClick(event) {
  console.log(event.target);
  const clickedTarget = event.target;
  const id = clickedTarget.id;
  console.log(id);

  if (totalClicks < 3) {
    if (id === 'left_product_img' || id === 'right_product_img' || id === 'center_product_img') {
      if (id === 'left_product_img') {
        leftProduct.clicks++;
      } else if (id === 'right_product_img') {
        rightProduct.clicks++;
      } else {
        centerProduct.clicks++;
      }
      totalClicks++;
      leftProduct.timesShown++;
      rightProduct.timesShown++;
      centerProduct.timesShown++;
      productSelector();
      renderProducts();
    }
  } else {
    products.removeEventListener('click', handleClick);
    makeButton();
  }
}

function makeButton() {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "View Results";
  const att = document.createAttribute("onclick");
  att.value = "handleSubmit()";
  btn.setAttributeNode(att);
  console.log(btn);
  buttonAdd.appendChild(btn);
}

function handleSubmit() {
  displayVoteCount();
}

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');



console.log(Product.allProducts[3]);

products.addEventListener('click', handleClick);

productSelector();
renderProducts();