/* Setting the price for each genre of books */
const GENRE_PRICES = {
    "CompSci": 45.00,
    "Law": 55.00,
    "Sci-Fi": 18.50,
    "Horror": 15.99
};

/* Organizing the books */
const ALL_BOOKS = [
    { id: "cs1", title: "Web Security", author: "Jayden Thomas", genre: "CompSci", image: "../Assessts/compsci/compsci_1.jpg" },
    { id: "cs2", title: "Linux Administration", author: "David wilis", genre: "CompSci", image: "../Assessts/compsci/compsci_2.jpg" },
    { id: "cs3", title: "Advanced Python", author: "John Brown", genre: "CompSci", image: "../Assessts/compsci/compsci_3.jpg" },
    { id: "cs4", title: "Database Systems", author: "David Bombal", genre: "CompSci", image: "../Assessts/compsci/compsci_4.jpg" },
    { id: "cs5", title: "Web Programming JS", author: "Kira Lee", genre: "CompSci", image: "../Assessts/compsci/compsci_5.jpg" },
    { id: "lw1", title: "Constitutional Law", author: "Davine Brooks", genre: "Law", image: "../Assessts/law/law_1.jpg" },
    { id: "lw2", title: "Criminal Justice", author: "Justice Dept", genre: "Law", image: "../Assessts/law/law_2.jpg" },
    { id: "lw3", title: "Business Ethics", author: "Corporate Council", genre: "Law", image: "../Assessts/law/law_3.jpg" },
    { id: "lw4", title: "Digital Privacy Law", author: "Carla Williams", genre: "Law", image: "../Assessts/law/law_4.jpg" },
    { id: "lw5", title: "International Trade", author: "Jerry Woo", genre: "Law", image: "../Assessts/law/law_5.jpg" },
    { id: "sf1", title: "Galactic Frontier", author: "Space Explorer", genre: "Sci-Fi", image: "../Assessts/scifi/scifi_1.jpg" },
    { id: "sf2", title: "Neon City Blues", author: "Cyberpunk Writer", genre: "Sci-Fi", image: "../Assessts/scifi/scifi_2.jpg" },
    { id: "sf3", title: "The Martian Colony", author: "Red Planet", genre: "Sci-Fi", image: "../Assessts/scifi/scifi_3.jpg" },
    { id: "sf4", title: "Quantum Paradox", author: "Time Traveler", genre: "Sci-Fi", image: "../Assessts/scifi/scifi_4.jpg" },
    { id: "sf5", title: "Starlight Voyage", author: "Nebula Pilot", genre: "Sci-Fi", image: "../Assessts/scifi/scifi_5.jpg" },
    { id: "hr1", title: "Shadow in the Attic", author: "Gothic Author", genre: "Horror", image: "../Assessts/horror/horror_1.jpg" },
    { id: "hr2", title: "The Midnight Howl", author: "Nightmare Poet", genre: "Horror", image: "../Assessts/horror/horror_2.jpg" },
    { id: "hr3", title: "Silent Asylum", author: "Berry Bonds", genre: "Horror", image: "../Assessts/horror/horror_3.jpg" },
    { id: "hr4", title: "Cursed Relic", author: "Local Legend", genre: "Horror", image: "../Assessts/horror/horror_4.jpg" },
    { id: "hr5", title: "Ghost of Kingston", author: "Local Legend", genre: "Horror", image: "../Assessts/horror/horror_5.jpg" }
].map(book => ({
    ...book,
    price: GENRE_PRICES[book.genre] || 19.99 
}));

// Getting the current user
const activeUser = JSON.parse(localStorage.getItem('currentUser')) || { username: "guest" };
const cartKey = `cart_${activeUser.username}`;

// Initialize cart by loading what is already in storage
let cart = JSON.parse(localStorage.getItem(cartKey)) || []; 

// Function to display books
function displayBooks(bookList) {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = ""; 

    for (let i = 0; i < bookList.length; i++) {
        let b = bookList[i];
        grid.innerHTML += `
            <div class="book-card">
                <img src="${b.image}" class="center-image" onerror="this.src='https://via.placeholder.com/150'">
                <h3>${b.title}</h3>
                <p>${b.author} • ${b.genre}</p>
                <div class="buy-row">
                    <span>$${b.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart('${b.id}')">Add to Cart</button>
                </div>
            </div>`;
    }
}

// Search Logic
function searchBooks() {
    let input = document.getElementById('masterSearch').value.toLowerCase();
    let results = ALL_BOOKS.filter(book => book.title.toLowerCase().includes(input));
    displayBooks(results);
}

// Genre Logic
function filterGenre(genre) {
    if (genre === 'all') {
        displayBooks(ALL_BOOKS);
    } else {
        let results = ALL_BOOKS.filter(book => book.genre === genre);
        displayBooks(results);
    }
}
// Cart Logic
function addToCart(id) {
    const book = ALL_BOOKS.find(b => b.id === id);
    if (book) {
        // Refresh the local cart variable from storage before pushing
        cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        
        cart.push(book);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        
        // Update Nav Counter
        document.getElementById('cart-count').innerText = cart.length;
        
        // Calculate subtotal, tax (15%), and discount (10%) to keep finalTotal in sync
        let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        let tax = subtotal * 0.15;
        let discount = subtotal * 0.10;
        let finalTotal = (subtotal + tax) - discount;
        
        localStorage.setItem('finalTotal', finalTotal.toFixed(2));
        
        alert(book.title + " added!");
    }
}
// Initial Load execution
displayBooks(ALL_BOOKS);
// UPDATED: Show the actual current cart count on load instead of forcing 0
document.getElementById('cart-count').innerText = cart.length;