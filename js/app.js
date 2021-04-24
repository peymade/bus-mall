'use strict';

// All the product images
// Store the products array into local storage as a formatted JSON string
// Retrieve the products array from local storage and then utilize the JSON.Parse() function. Remember, if your constructor utilizes prototype methods, you will have to send each item in the array back through the constructor function. 

// Point to elements on the index page
const results = document.getElementById('results');
const resultTab = document.getElementById('aside');
const products = document.getElementById('total_products');
const leftProductImage = document.getElementById('left_product_img');
const centerProductImage = document.getElementById('center_product_img');
const rightProductImage = document.getElementById('right_product_img');
const leftProductH = document.getElementById('left_product_h');
const centerProductH = document.getElementById('center_product_h');
const rightProductH = document.getElementById('right_product_h');
const buttonAdd = document.getElementById('buttonOne');

// Set global variables for the products an total clicks
let totalClicks = 0;

let leftProduct = null;
let centerProduct = null;
let rightProduct = null;

// Create constructor function for adding new projects
function Product(name, imgPath, clicks, timesShown) {
  this.name = name;
  this.imgPath = imgPath;
  this.clicks = clicks;
  this.timesShown = timesShown;

  Product.allProducts.push(this);
}

// Array with all products when they are created. STORE IN LOCAL STORAGE
Product.allProducts = [];

// Create function to get products from storage.
// If there is something in storage, use it and add to it
// If there is nothing in storage, make the products and get ready to add numbers to them. Make sure to add those numbers to the storage too.
function getProductsFromStorage() {
  // Set variable equal to previous orders in local storage
  let stringifiedOrders = localStorage.getItem('previousOrders');
  console.log(stringifiedOrders, "out of storage");

  // Take whatever was gotten out of storage and evaluate
  if (stringifiedOrders === null) {
    // If there is nothing in storage, make the new items and go through loop again
    makeProducts();   
    }

  if (stringifiedOrders !== null) {
    let parsedOrders = JSON.parse(stringifiedOrders);
    console.log(parsedOrders);
    for (let i = 0; i < parsedOrders.length; i++) {
      new Product(parsedOrders[i].name, parsedOrders[i].imgPath, parsedOrders[i].clicks, parsedOrders[i].timesShown)
    } 
  }
  
}

getProductsFromStorage();


// Make all the products
function makeProducts() {
  new Product('bag', 'img/bag.jpg', 0, 0);
  new Product('banana', 'img/banana.jpg', 0, 0);
  new Product('bathroom', 'img/bathroom.jpg', 0, 0);
  new Product('boots', 'img/boots.jpg', 0, 0);
  new Product('breakfast', 'img/breakfast.jpg', 0, 0);
  new Product('bubblegum', 'img/bubblegum.jpg', 0, 0);
  new Product('chair', 'img/chair.jpg', 0, 0);
  new Product('cthulhu', 'img/cthulhu.jpg', 0, 0);
  new Product('dog-duck', 'img/dog-duck.jpg', 0, 0);
  new Product('dragon', 'img/dragon.jpg', 0, 0);
  new Product('pen', 'img/pen.jpg', 0, 0);
  new Product('pet-sweep', 'img/pet-sweep.jpg', 0, 0);
  new Product('scissors', 'img/scissors.jpg', 0, 0);
  new Product('shark', 'img/shark.jpg', 0, 0);
  new Product('sweep', 'img/sweep.png', 0, 0);
  new Product('tauntaun', 'img/tauntaun.jpg', 0, 0);
  new Product('unicorn', 'img/unicorn.jpg', 0, 0);
  new Product('usb', 'img/usb.gif', 0, 0);
  new Product('water-can', 'img/water-can.jpg', 0, 0);
  new Product('wine-glass', 'img/wine-glass.jpg', 0, 0); 
  //make to a string
  console.log(Product.allProducts);
  let stringifiedOrders = JSON.stringify(Product.allProducts);
  console.log(stringifiedOrders);
  //put the string of the array in storage
  localStorage.setItem('previousOrders', stringifiedOrders);
}

// Render the products to the screen
const renderProducts = function() {
  leftProductImage.src = leftProduct.imgPath;
  centerProductImage.src = centerProduct.imgPath;
  rightProductImage.src = rightProduct.imgPath;
  leftProductH.textContent = leftProduct.name;
  centerProductH.textContent = centerProduct.name;
  rightProductH.textContent = rightProduct.name;
}

// Function to choose products that were not in the previous three, and also that are different from one another
function productSelector() {
  const previousProducts = [];
  previousProducts.push(leftProduct);
  previousProducts.push(centerProduct);
  previousProducts.push(rightProduct);

  // a different index number than the first one
  console.log(Product.allProducts);
   while (previousProducts.includes(rightProduct)){
    let rightIndex = Math.floor(Math.random() * Product.allProducts.length);
    rightProduct = Product.allProducts[rightIndex];
    console.log(rightIndex);
   } previousProducts.push(rightProduct);

  while (previousProducts.includes(leftProduct)) {
   let leftIndex = Math.floor(Math.random() * Product.allProducts.length);
    leftProduct = Product.allProducts[leftIndex];
    console.log(leftIndex);
  } previousProducts.push(leftProduct);

  while (previousProducts.includes(centerProduct)) {
    let centerIndex = Math.floor(Math.random() * Product.allProducts.length);
    centerProduct = Product.allProducts[centerIndex];
    console.log(centerIndex);
  }
}   

// Display the votes on the left of the page. Run after the button click.
function displayVoteCount() {
  // remove current input and replace
  results.innerHTML = ' ';
  for (let i = 0; i < Product.allProducts.length; i++) {
    const liElem = document.createElement('li');
    liElem.textContent = (Product.allProducts[i].name + ' had ' + Product.allProducts[i].clicks + ' votes, and was seen ' + Product.allProducts[i].timesShown + ' times.');
    results.appendChild(liElem);
  }
}

// Also run after the button click. Renders the chart with chart.js.
function renderChart() {
  let labelData = [];
  for (let i = 0; i < Product.allProducts.length; i++){
    labelData.push(Product.allProducts[i].name);
  }
  let voteData = [];
  for (let i = 0; i < Product.allProducts.length; i++){
    voteData.push(Product.allProducts[i].clicks);
  }

  let timesShownData = [];
  for (let i = 0;i < Product.allProducts.length; i++) {
    timesShownData.push(Product.allProducts[i].timesShown)
  }


// Create chart storing all data shown on the side, but in a visual format
var ctx = document.getElementById('productChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelData,
        datasets: [{
            label: '# of Votes',
            data: voteData,
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple',
                'purple'
            ],
            borderWidth: 1
        },
      
        {
          label: '# of Times Shown',
          data: timesShownData,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange',
            'orange'
          ],
          borderWidth: 1
        }
      
      
      ]



    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


}

// Control what happens when an image is clicked on
function handleClick(event) {
  // console.log(event.target);
  const clickedTarget = event.target;
  const id = clickedTarget.id;
  // console.log(id);

  if (totalClicks < 25) {
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

// Create a button that appears only after the user has chosen 25 items
function makeButton() {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "View Results";
  const att = document.createAttribute("onclick");
  att.value = "handleSubmit()";
  btn.setAttributeNode(att);
  // console.log(btn);
  buttonAdd.appendChild(btn);
}

// Display the vote data on the side, the chart below, and push it to local storage
function handleSubmit() {

  displayVoteCount();
  renderChart();
  pushNewData();
}


// Take all the new vote data and push it to the allProducts array, then push that to storage 
function pushNewData() {
  console.log(Product.allProducts);
  let stringifiedOrders = JSON.stringify(Product.allProducts);
  console.log(stringifiedOrders);
  //put the string of the array in storage
  localStorage.setItem('previousOrders', stringifiedOrders);
}


products.addEventListener('click', handleClick);

productSelector();
renderProducts();

