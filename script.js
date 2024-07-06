const groceryItems = [
    { id: 1, name: 'Button Mushrooms', price: 290.00, productimage: 'button.webp',categories:'mushroom' },
    { id: 2, name: 'Oyester Mushrooms', price: 290.00, productimage: 'oyester.jpg',categories:'mushroom' },
    { id: 3, name: 'Milky Mushrooms', price: 300.00, productimage: 'milky.webp',categories:'mushroom' },
    { id: 4, name: 'Fresh Panneer', price: 350.00, productimage: 'panner.webp',categories:'dairy' },
    { id: 5, name: 'Coarse Grain Wheat Fresh Flour', price: 30.00, productimage: 'atta.jpeg',categories:'dailyuse' },
    { id: 6, name: 'Apple', price: 160.00, productimage: 'apple.jpg',categories:'fruits' },
    { id: 7, name: 'Spices', price: 300.00, productimage: 'spices.jpg',categories:'spices' },
    { id: 8, name: 'Chana Dal', price: 150.00, productimage: 'chana.jpeg',categories:'cereal' }
];
//localStorage.setItem('cart',JSON.stringify(groceryItems));

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const groceryItemsContainer = document.querySelector('.product-container');
const cartContainer = document.querySelector('.cart');
const totalCostContainer = document.getElementById('total-cost');
const checkoutButton = document.getElementById('checkout');
const searchBar = document.getElementById('search-bar');
const quantitySpan = document.querySelector('.quan');

function displayGroceryItems(items) {
    groceryItemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('grocery-item');
        itemDiv.innerHTML = `
         <img src="${item.productimage}"/>
        <strong>${item.name} </strong>
        <span class="quantity">1 KG</span>
        <span class="price">₹${item.price.toFixed(2)}</span>
        <a class="cart-btn" onclick="addToCart(${item.id})">
            <i class="fas fa-shopping-cart"></i> Add Cart
        </a>
    `;
        groceryItemsContainer.appendChild(itemDiv);
    });
}

function displayCart() {
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
        <img src="${item.productimage}" height="50" width="50"/>
        <span><h6>${item.name} - ₹ ${item.price.toFixed(2)} x ${item.quantity}</h6></span>
        <button onclick="decrementQuantity(${item.id})" class="counter"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#BB271A"><path d="M232-444v-72h496v72H232Z"/></svg></button>
        <span class="count-num">${item.quantity}</span>
        <button onclick="incrementQuantity(${item.id})" class="counter"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#BB271A"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"/></svg></button>
        <button class="remove" onclick="removeFromCart(${item.id})"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#BB271A"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
    `;
        cartContainer.appendChild(itemDiv);
    });
    displayTotalCost();
    updateCartQuantity();
}

function addToCart(id) {
    const item = groceryItems.find(item => item.id === id);
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
        });
        Toast.fire({
          icon: "success",
          title: "Added To Cart"
        });
        updateCartQuantity();
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
        });
        Toast.fire({
          icon: "success",
          title: "Removed From The Cart"
        });
        updateCartQuantity();
}
function incrementQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function decrementQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
    } else if (cartItem && cartItem.quantity === 1) {
        removeFromCart(id);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}
function updateCartQuantity() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    quantitySpan.innerText = totalQuantity;
}
function displayTotalCost() {
    const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalCostContainer.innerText = `Total Cost: ₹ ${totalCost.toFixed(2)}`;
}

function searchItems() {
    const query = searchBar.value.toLowerCase();
    const filteredItems = groceryItems.filter(item => item.name.toLowerCase().includes(query));
    displayGroceryItems(filteredItems);
}

checkoutButton.addEventListener('click', () => {
    window.location.replace('cart.html');
});

displayGroceryItems(groceryItems);
displayCart();
