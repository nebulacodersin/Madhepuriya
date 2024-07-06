const cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <div class="cart-item-controls">
                <button onclick="decrementQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="incrementQuantity(${item.id})">+</button>
                <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    displayTotalCost();
}

function displayTotalCost() {
    const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalCostContainer = document.getElementById('total-cost');
    totalCostContainer.innerText = `Total Cost: $${totalCost.toFixed(2)}`;
}

function incrementQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
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
    displayCartItems();
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}
function updateCartQuantity() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    quantitySpan.innerText = totalQuantity;
}


document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pin = document.getElementById('pin').value;

    const cartDetails = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
    }));

    const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const cartDetailsInput = document.getElementById('cart-details');
    cartDetailsInput.value = JSON.stringify({
        cartDetails,
        totalCost
    });

    this.submit();
});
displayCartItems();
