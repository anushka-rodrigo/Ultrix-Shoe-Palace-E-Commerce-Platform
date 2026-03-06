# Ultrix Shoe Palace - E-Commerce Web Application

## Project Overview

Ultrix Shoe Palace is a complete e-commerce web application for selling premium footwear. The application features a modern, responsive frontend built with HTML, CSS, and JavaScript, connected to a Spring Boot backend with MySQL database.

## Features

### Customer Features
- Browse products by category (Men's, Women's, Kids', Sports, Casual, Formal)
- View product details with images, descriptions, and pricing
- Filter and sort products by category, price, and name
- Add products to shopping cart
- Update cart quantities and remove items
- Secure checkout process with order placement
- User registration and login system

### Admin Features
- Secure admin authentication
- Complete product management (CRUD operations)
- Add new products with images, descriptions, and pricing
- Edit existing product details
- Delete products from inventory
- View all products in organized table format
- Real-time inventory management

### Technical Features
- Responsive design for all device sizes
- Role-based access control (Customer vs Admin)
- RESTful API integration with Spring Boot backend
- Local storage for session management
- Modern, attractive UI with custom color scheme
- Smooth animations and transitions

## Setup Instructions

### Prerequisites
- Spring Boot backend running on port 8080
- MySQL database configured and running
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Backend Setup
1. Ensure your Spring Boot application is running
2. Verify MySQL database is connected
3. The backend should be accessible at `http://localhost:8080`

### Frontend Setup
1. Extract all files to a directory
2. Open `js/config.js` and verify the API_BASE_URL:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080';
   ```
3. Open `index.html` in a web browser or use a local server:
   - **Option 1**: Double-click `index.html` to open in browser
   - **Option 2**: Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
4. Access the application at `http://localhost:8000` (or the port shown)

## User Roles

### Customer Account
- **Role**: CUS
- **Capabilities**:
  - Browse all products without login
  - Must login to add items to cart
  - Can manage cart items
  - Can place orders

### Admin Account
- **Role**: ADMIN
- **Capabilities**:
  - Full product management (Add, Edit, Delete)
  - View all products in inventory
  - Cannot access shopping cart
  - Separate login portal

## API Endpoints Used

### Product Endpoints
- `GET /products/allProduct` - Get all products
- `GET /products/{id}` - Get product by ID
- `POST /products/addProduct` - Add new product
- `PUT /products/updateProduct/{id}` - Update product
- `DELETE /products/deleteProduct/{id}` - Delete product

### User Endpoints
- `GET /users/allUsers` - Get all users
- `GET /users/{id}` - Get user by ID
- `POST /users/addUser` - Register new user

### Cart Endpoints
- `POST /cart/addToCart` - Add item to cart
- `GET /cart/user/{userId}` - Get user's cart items
- `PUT /cart/updateCart/{cartId}` - Update cart item quantity
- `DELETE /cart/delete/{cartId}` - Remove cart item
- `DELETE /cart/clear/{userId}` - Clear user's cart

### Order Endpoints
- `POST /orders/checkout/{userId}` - Place order

## Testing the Application

### Creating Test Accounts

1. **Create Admin Account**:
   - Navigate to Admin Signup page
   - Fill in the form with admin credentials
   - Submit to create admin account

2. **Create Customer Account**:
   - Navigate to Customer Signup page
   - Fill in the form with customer details
   - Submit to create customer account

### Testing Customer Flow

1. Browse products on home page
2. Click "Shop" to view all products
3. Use filters to find specific products
4. Click on a product to view details
5. Login as customer
6. Add products to cart
7. View cart and update quantities
8. Proceed to checkout

### Testing Admin Flow

1. Login as admin
2. View all products in dashboard
3. Add new product with details
4. Edit existing product
5. Delete a product

## Color Scheme

- **Primary Dark**: #0A2647 (Headers, footers)
- **Primary Blue**: #144272
- **Light Blue**: #E8F1F5 (Body background)
- **Accent Blue**: #2C74B3 (Buttons, highlights)
- **Text Dark**: #1A1A1A (Main text)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **Products not loading**:
   - Verify backend is running on port 8080
   - Check browser console for errors
   - Ensure CORS is enabled in Spring Boot

2. **Login not working**:
   - Check if users table has data
   - Verify email and password are correct
   - Check browser console for errors

3. **Cart not updating**:
   - Ensure user is logged in as customer
   - Check if cart endpoints are working
   - Verify user ID is being sent correctly

4. **Images not showing**:
   - Check if image URLs are valid
   - Ensure CORS allows image loading
   - Verify imgURL field in database

## Development Notes

### Adding New Products via Admin
Product fields required:
- Name: Product name
- Brand: Brand name
- Price: Decimal value (e.g., 99.99)
- Size: Integer (shoe size)
- Category: men, woman, kids, sports, casual, formal
- Stock: Available quantity
- Image URL: Valid image URL
- Description: Product description

### Database Schema
The application expects the following entities:
- Product (id, name, brand, price, size, cat, imgURL, stock, description)
- User (id, name, email, password, role, phone, address)
- Cart (id, user, product, quantity)
- Order (id, user, total, orderDate)
- OrderItems (id, order, product, quantity, price)

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend API is responding
3. Ensure database connections are active
4. Review Spring Boot logs for backend errors

## Assignment Requirements Met

✅ Frontend created with HTML, CSS, and JavaScript
✅ Product information displayed from Spring Boot API
✅ Users can view available products
✅ Cart operations (add, remove, update quantities)
✅ Spring Boot backend with MySQL database
✅ Entities, Repositories, Services, and Controllers implemented
✅ CRUD operations through RESTful APIs
✅ Frontend and backend interaction demonstrated

## Future Enhancements

- Payment gateway integration
- Order history for customers
- Product reviews and ratings
- Wishlist functionality
- Advanced search capabilities
- Email notifications
- Password recovery
- Product recommendations

---

**Ultrix Shoe Palace** - Premium Footwear E-Commerce Platform
