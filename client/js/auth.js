// Authentication utilities

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check if user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'ADMIN';
}

// Check if user is customer
function isCustomer() {
    const user = getCurrentUser();
    return user && user.role === 'CUS';
}

// Protect admin pages
function protectAdminPage() {
    if (!isLoggedIn() || !isAdmin()) {
        alert('Access denied! Admin privileges required.');
        window.location.href = 'admin-login.html';
    }
}

// Protect customer pages
function protectCustomerPage() {
    if (!isLoggedIn() || !isCustomer()) {
        alert('Please login to access this page.');
        window.location.href = 'customer-login.html';
    }
}

// Update UI based on authentication status
function updateAuthUI() {
    const authLink = document.getElementById('authLink');
    const cartLink = document.getElementById('cartLink');
    
    if (!authLink) return;
    
    if (isLoggedIn()) {
        const user = getCurrentUser();
        if (isAdmin()) {
            authLink.textContent = 'Dashboard';
            authLink.href = 'admin-dashboard.html';
        } else {
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.onclick = (e) => {
                e.preventDefault();
                logout();
            };
        }
        
        // Update cart link for customers
        if (isCustomer() && cartLink) {
            cartLink.href = 'cart.html';
            updateCartCount();
        }
    } else {
        authLink.textContent = 'Login';
        authLink.href = 'customer-login.html';
        
        // Cart link should redirect to login for non-logged in users
        if (cartLink) {
            cartLink.onclick = (e) => {
                if (!isLoggedIn()) {
                    e.preventDefault();
                    alert('Please login to view your cart.');
                    window.location.href = 'customer-login.html';
                }
            };
        }
    }
}

// Update cart count badge
async function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount || !isCustomer()) return;
    
    try {
        const user = getCurrentUser();
        const cartItems = await apiCall(API_ENDPOINTS.getCartItems(user.id));
        cartCount.textContent = cartItems ? cartItems.length : 0;
    } catch (error) {
        console.error('Error updating cart count:', error);
        cartCount.textContent = 0;
    }
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});
