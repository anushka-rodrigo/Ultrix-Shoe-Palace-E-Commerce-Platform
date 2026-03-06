// Admin Signup JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const adminSignupForm = document.getElementById('adminSignupForm');
    adminSignupForm.addEventListener('submit', handleAdminSignup);
});

async function handleAdminSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    // Validate passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long!';
        errorMessage.style.display = 'block';
        return;
    }
    
    try {
        // Check if email already exists
        const users = await apiCall(API_ENDPOINTS.getAllUsers);
        const emailExists = users.some(u => u.email === email);
        
        if (emailExists) {
            errorMessage.textContent = 'Email already registered. Please use a different email.';
            errorMessage.style.display = 'block';
            return;
        }
        
        // Create new admin object
        const newAdmin = {
            name: name,
            email: email,
            password: password,
            role: 'ADMIN',
            phone: phone,
            address: address
        };
        
        // Add admin via API
        await apiCall(API_ENDPOINTS.addUser, 'POST', newAdmin);
        
        // Show success message
        successMessage.textContent = 'Admin account created successfully! Redirecting to login...';
        successMessage.style.display = 'block';
        
        // Reset form
        document.getElementById('adminSignupForm').reset();
        
        // Redirect to admin login after 2 seconds
        setTimeout(() => {
            window.location.href = 'admin-login.html';
        }, 2000);
        
    } catch (error) {
        console.error('Admin signup error:', error);
        errorMessage.textContent = 'An error occurred during registration. Please try again.';
        errorMessage.style.display = 'block';
    }
}
