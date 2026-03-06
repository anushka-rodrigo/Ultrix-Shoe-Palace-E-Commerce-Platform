// Customer Login JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Redirect if already logged in
    if (isLoggedIn() && isCustomer()) {
        window.location.href = 'index.html';
    }
    
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
});

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.style.display = 'none';
    
    try {
        // Fetch all users
        const users = await apiCall(API_ENDPOINTS.getAllUsers);
        
        // Find user with matching email and password
        const user = users.find(u => 
            u.email === email && 
            u.password === password && 
            u.role === 'CUS'
        );
        
        if (user) {
            // Store user in localStorage
            setCurrentUser(user);
            
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'Invalid email or password. Please try again.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.style.display = 'block';
    }
}
