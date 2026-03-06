// Admin Login JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Redirect if already logged in as admin
    if (isLoggedIn() && isAdmin()) {
        window.location.href = 'admin-dashboard.html';
    }
    
    const adminLoginForm = document.getElementById('adminLoginForm');
    adminLoginForm.addEventListener('submit', handleAdminLogin);
});

async function handleAdminLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.style.display = 'none';
    
    try {
        // Fetch all users
        const users = await apiCall(API_ENDPOINTS.getAllUsers);
        
        // Find admin user with matching email and password
        const admin = users.find(u => 
            u.email === email && 
            u.password === password && 
            u.role === 'ADMIN'
        );
        
        if (admin) {
            // Store admin in localStorage
            setCurrentUser(admin);
            
            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid admin credentials. Please try again.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Admin login error:', error);
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.style.display = 'block';
    }
}
