// Shopping Cart JavaScript

let cartItems = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Protect this page - only logged in customers can access
    if (!isLoggedIn() || !isCustomer()) {
        alert('Please login as a customer to view your cart.');
        window.location.href = 'customer-login.html';
        return;
    }
    
    await loadCartItems();
    setupCheckout();
});

// Load cart items
async function loadCartItems() {
    const user = getCurrentUser();
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCart = document.getElementById('emptyCart');
    
    try {
        cartItems = await apiCall(API_ENDPOINTS.getCartItems(user.id));
        
        if (!cartItems || cartItems.length === 0) {
            cartItemsContainer.style.display = 'none';
            document.querySelector('.cart-summary').style.display = 'none';
            emptyCart.style.display = 'block';
            return;
        }
        
        cartItemsContainer.style.display = 'block';
        document.querySelector('.cart-summary').style.display = 'block';
        emptyCart.style.display = 'none';
        
        displayCartItems();
        updateCartSummary();
        
    } catch (error) {
        console.error('Error loading cart items:', error);
        alert('Error loading cart. Please try again.');
    }
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-cart-id="${item.id}">
            <img src="${item.product.imgURL}" alt="${item.product.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/120?text=No+Image'">
            <div class="cart-item-details">
                <h3>${item.product.name}</h3>
                <p class="cart-item-brand">${item.product.brand}</p>
                <p class="cart-item-price">Rs. ${item.product.price.toFixed(2)}</p>
                <p style="color: #666; font-size: 0.9rem;">Size: ${item.product.size}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

// Update quantity
async function updateQuantity(cartId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(cartId);
        return;
    }
    
    try {
        await apiCall(
            `${API_ENDPOINTS.updateCartItem(cartId)}?quantity=${newQuantity}`,
            'PUT'
        );
        
        // Update local cart items
        const itemIndex = cartItems.findIndex(item => item.id === cartId);
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity = newQuantity;
        }
        
        displayCartItems();
        updateCartSummary();
        updateCartCount();
        
    } catch (error) {
        console.error('Error updating quantity:', error);
        alert('Error updating quantity. Please try again.');
    }
}

// Remove item
async function removeItem(cartId) {
    if (!confirm('Are you sure you want to remove this item from your cart?')) {
        return;
    }
    
    try {
        await apiCall(API_ENDPOINTS.deleteCartItem(cartId), 'DELETE');
        
        // Remove from local cart items
        cartItems = cartItems.filter(item => item.id !== cartId);
        
        if (cartItems.length === 0) {
            await loadCartItems(); // Reload to show empty cart message
        } else {
            displayCartItems();
            updateCartSummary();
        }
        
        updateCartCount();
        
    } catch (error) {
        console.error('Error removing item:', error);
        alert('Error removing item. Please try again.');
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `Rs. ${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `Rs. ${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `Rs. ${total.toFixed(2)}`;
}

// Setup checkout
function setupCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', handleCheckout);
}

// Handle checkout
async function handleCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    if (!confirm('Proceed to checkout? This will place your order.')) {
        return;
    }
    
    const user = getCurrentUser();
    
    try {
        const response = await apiCall(
            API_ENDPOINTS.checkout(user.id),
            'POST'
        );
        
        alert('Order placed successfully! Payment on delivery.');
        
        // Redirect to home page
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error during checkout. Please try again.');
    }
}
