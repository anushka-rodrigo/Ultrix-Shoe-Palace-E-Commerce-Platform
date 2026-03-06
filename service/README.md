\# Ultrix Shoe Palace - Spring Boot Backend



The backend of \*\*Ultrix Shoe Palace\*\* is a Spring Boot application that powers the e-commerce platform for premium footwear. It provides RESTful APIs for managing products, users, carts, and orders, with role-based access control for customers and admins. The backend connects to a MySQL database to store all application data.



---



\## Features



\### Customer Features

\- View all products

\- View individual product details

\- Add items to cart

\- Update cart items

\- Remove items from cart

\- Checkout to create orders



\### Admin Features

\- Full product management (CRUD)

\- View all products in inventory

\- Manage stock and product details

\- Secure admin authentication



\### Technical Features

\- RESTful API endpoints for all operations

\- Role-based access control (CUSTOMER and ADMIN)

\- MySQL database integration

\- Exception handling for invalid requests

\- Cross-Origin support for frontend integration

\- Hibernate/JPA for database operations



---



\## API Endpoints



\### Product Endpoints

\- `GET /products/allProduct` – List all products

\- `GET /products/{id}` – Get product by ID

\- `POST /products/addProduct` – Add a new product (Admin only)

\- `PUT /products/updateProduct/{id}` – Update product details (Admin only)

\- `DELETE /products/deleteProduct/{id}` – Delete product (Admin only)



\### User Endpoints

\- `GET /users/allUsers` – List all users

\- `GET /users/{id}` – Get user by ID

\- `POST /users/addUser` – Register a new user



\### Cart Endpoints

\- `POST /cart/addToCart` – Add product to cart

\- `GET /cart/user/{userId}` – Get user's cart items

\- `PUT /cart/updateCart/{cartId}` – Update quantity of a cart item

\- `DELETE /cart/delete/{cartId}` – Remove item from cart

\- `DELETE /cart/clear/{userId}` – Clear all cart items for a user



\### Order Endpoints

\- `POST /orders/checkout/{userId}` – Checkout and place an order



---



\## User Roles



\### Customer (CUS)

\- Browse products

\- Add/update/remove items in cart

\- Place orders



\### Admin (ADMIN)

\- Manage products (CRUD)

\- View inventory

\- Cannot access cart or checkout



---



\## Testing the Backend



\- Use \*\*Postman\*\* or \*\*Insomnia\*\* to test API endpoints with JSON payloads.  

\- Example: Add a product



```json

POST /products/addProduct

{

&nbsp;   "name": "Ultrix Runner",

&nbsp;   "brand": "Ultrix",

&nbsp;   "price": 129.99,

&nbsp;   "size": 42,

&nbsp;   "cat": "men",

&nbsp;   "stock": 50,

&nbsp;   "imgURL": "https://example.com/img/shoe.jpg",

&nbsp;   "description": "Premium running shoe"

}



\## Future Enhancements



\- Role-based JWT authentication

\- Admin analytics dashboard

\- Order history API

\- Payment gateway integration



---



\*\*Ultrix Shoe Palace\*\* - Premium Footwear E-Commerce Platform

