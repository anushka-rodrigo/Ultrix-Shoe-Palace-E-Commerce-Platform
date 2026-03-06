// API Configuration
// Update this URL to match your Spring Boot backend URL
const API_BASE_URL = 'http://localhost:8080';

const API_ENDPOINTS = {
    // Product endpoints
    getAllProducts: `${API_BASE_URL}/products/allProduct`,
    getProduct: (id) => `${API_BASE_URL}/products/${id}`,
    addProduct: `${API_BASE_URL}/products/addProduct`,
    updateProduct: `${API_BASE_URL}/products/updateProduct`,
    updateProductById: (id) => `${API_BASE_URL}/products/updateProduct/${id}`,
    deleteProduct: (id) => `${API_BASE_URL}/products/deleteProduct/${id}`,
    
    // User endpoints
    getAllUsers: `${API_BASE_URL}/users/allUsers`,
    getUser: (id) => `${API_BASE_URL}/users/${id}`,
    addUser: `${API_BASE_URL}/users/addUser`,
    updateUser: `${API_BASE_URL}/users/updateUser`,
    updateUserById: (id) => `${API_BASE_URL}/users/updateUser/${id}`,
    deleteUser: (id) => `${API_BASE_URL}/users/deleteUser/${id}`,
    
    // Cart endpoints
    addToCart: `${API_BASE_URL}/cart/addToCart`,
    getCartItems: (userId) => `${API_BASE_URL}/cart/user/${userId}`,
    updateCartItem: (cartId) => `${API_BASE_URL}/cart/updateCart/${cartId}`,
    deleteCartItem: (cartId) => `${API_BASE_URL}/cart/delete/${cartId}`,
    clearCart: (userId) => `${API_BASE_URL}/cart/clear/${userId}`,
    
    // Order endpoints
    checkout: (userId) => `${API_BASE_URL}/orders/checkout/${userId}`
};

// Helper function to make API calls
async function apiCall(url, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // For DELETE requests that might return empty body
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        
        return null;
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}
