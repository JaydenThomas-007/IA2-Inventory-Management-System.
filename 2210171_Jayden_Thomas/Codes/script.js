document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registrationForm');

    // Regsitraion
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newUser = {
                fullName: document.getElementById('fullName').value,
                username: document.getElementById('regUsername').value,
                password: document.getElementById('regPassword').value
            };

            // Get the current list of all users from storage
            let users = JSON.parse(localStorage.getItem('allUsers')) || [];

            // Check if username exists to prevent duplication
            if (users.some(u => u.username === newUser.username)) {
                return alert('This username is already taken!');
            }

            // Add the new user to the existing list and save
            users.push(newUser);
            localStorage.setItem('allUsers', JSON.stringify(users));
            
            alert('Registration Successful!');
            window.location.href = 'index.html'; 
        });
    }

    // Login logic
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userIn = document.getElementById('username').value;
            const passIn = document.getElementById('password').value;

            // Get all user data
            const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

            // Search for a matching user
            const match = allUsers.find(u => u.username === userIn && u.password === passIn);

            /* Saving the matching user as current user to help with the checking out of books
                and to also know who is currently login in*/
            if (match) {
                localStorage.setItem('currentUser', JSON.stringify(match));
                window.location.href = 'products.html'; 
            } else {
                alert('Invalid username or password!');
            }
        });
    }
});