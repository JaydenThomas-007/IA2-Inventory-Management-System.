document.addEventListener('DOMContentLoaded', function() {
    // Grab the current user
    var user = JSON.parse(localStorage.getItem('currentUser'));

    // If no user is logged in, redirect to login page
    if (!user) {
        alert("Please login first!");
        window.location.href = 'index.html';
        return;
    }

    var cartKey = "cart_" + user.username;
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    var total = localStorage.getItem('finalTotal') || "0.00";

    // Show customer info
    document.getElementById('user-checkout-tag').innerText = "Customer: " + user.fullName;
    document.getElementById('pay-amount').innerText = "$" + total;

    // Payment Logic
    document.getElementById('checkoutForm').addEventListener('submit', function(event) {
        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Payment Successful! Opening your receipt...");

        // Generate Receipt
        var receipt = window.open('', '_blank');
        receipt.document.write("<html><head><title>Receipt</title></head><body>");
        receipt.document.write("<h1>InkStream Official Receipt</h1>");
        receipt.document.write("<p><strong>Customer:</strong> " + user.fullName + "</p>");
        receipt.document.write("<p><strong>Date:</strong> " + new Date().toLocaleDateString() + "</p>");
        receipt.document.write("<hr>");

        for (var i = 0; i < cart.length; i++) {
            var currentBook = cart[i];
            receipt.document.write("<div style='margin-bottom: 10px;'>");
            receipt.document.write("<img src='" + currentBook.image + "' width='80' style='float:left; margin-right:10px;'>");
            receipt.document.write("<h3>" + currentBook.title + "</h3>");
            receipt.document.write("<p>Price: $" + currentBook.price.toFixed(2) + "</p>");
            receipt.document.write("<div style='clear:both;'></div><hr>");
            receipt.document.write("</div>");
        }

        receipt.document.write("<h2>Total Paid: $" + total + "</h2>");
        receipt.document.write("</body></html>");
        
        receipt.document.close();
        receipt.print(); 

        // Clear the cart after the book has been bought
        localStorage.removeItem(cartKey);
        localStorage.removeItem('finalTotal');
        
        window.location.href = 'products.html';
    });
});