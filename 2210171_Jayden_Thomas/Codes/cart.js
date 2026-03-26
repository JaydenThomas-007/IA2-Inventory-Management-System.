document.addEventListener('DOMContentLoaded', function() {
    // Get the current user
    var user = JSON.parse(localStorage.getItem('currentUser')) || { fullName: "Guest", username: "guest" };
    
    // Define the unique locker for this specific user
    var cartKey = "cart_" + user.username;
    
    // Pull the items from that specific locker
    var cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Update the Welcome Text
    var welcomeText = document.getElementById('user-cart-tag');
    if (welcomeText) {
        welcomeText.innerText = user.fullName + "'s Shopping Bag";
    }

    // Displaying the cart items
    renderCartItems(cartItems, cartKey);
});
// Display cart items
function renderCartItems(items, cartKey) {
    var container = document.getElementById('cart-items');
    var subtotal = 0;

    if (items.length === 0) {
        container.innerHTML = "<p>Your cart is empty!</p>";
        updatePrices(0);
        return;
    }
    container.innerHTML = "";
    for (var i = 0; i < items.length; i++) {
        var book = items[i];
        subtotal += book.price;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${book.image}" width="100" onerror="this.src='https://via.placeholder.com/150'">
                <div class="item-info">
                    <h4>${book.title}</h4>
                    <p>$${book.price.toFixed(2)}</p>
                </div>
                <button class="jsFont" onclick="deleteItem(${i}, '${cartKey}')">Remove</button>
            </div>`;
    }
    updatePrices(subtotal);
}

// Updating book price
function updatePrices(amount) {
    var tax = amount * 0.15; // 15% GCT
    var discount = amount * 0.10; // 10% Discount
    var finalTotal = (amount + tax) - discount;

    document.getElementById('subtotal').innerText = "$" + amount.toFixed(2);
    document.getElementById('tax').innerText = "$" + tax.toFixed(2);
    document.getElementById('discount').innerText = "-$" + discount.toFixed(2);
    document.getElementById('grand-total').innerText = "$" + finalTotal.toFixed(2);
    
    localStorage.setItem('finalTotal', finalTotal.toFixed(2));
}

// Function to the selected book
window.deleteItem = function(index, key) {
    var cart = JSON.parse(localStorage.getItem(key));
    cart.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(cart));
    location.reload(); 
};

// Function to redirect to checkout
window.proceedToCheckout = function() {
    // Optional: Check if cart is empty before letting them leave
    var user = JSON.parse(localStorage.getItem('currentUser')) || { username: "guest" };
    var cartKey = "cart_" + user.username;
    var cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (cartItems.length === 0) {
        alert("Your cart is empty! Add some books before checking out.");
    } else {
        window.location.href = 'checkout.html';
    }
};