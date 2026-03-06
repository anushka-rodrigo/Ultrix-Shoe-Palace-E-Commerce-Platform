\# Ultrix Shoe Palace - Premium Footwear E-Commerce Platform



\*\*Ultrix Shoe Palace\*\* is a complete e-commerce web application for premium footwear. The project consists of a \*\*Spring Boot backend\*\* with MySQL database and a \*\*responsive frontend\*\* built with HTML, CSS, and JavaScript. The platform allows customers to browse and purchase shoes while providing admins with full product management capabilities.



---



\## Project Overview



\- \*\*Frontend\*\*: Modern, responsive interface with product browsing, cart management, and checkout features.

\- \*\*Backend\*\*: Spring Boot RESTful API providing product, user, cart, and order management with role-based access control.

\- \*\*Database\*\*: MySQL used to store all application data including products, users, carts, and orders.



The frontend and backend work together to deliver a seamless shopping experience with secure customer and admin operations.



---



\## Features



\### Customer Features

\- Browse products by category (Men, Women, Kids, Sports, Casual, Formal)

\- View product details with images, descriptions, and pricing

\- Filter and sort products by category, price, and name

\- Add products to shopping cart

\- Update cart quantities and remove items

\- Secure checkout process with order placement

\- User registration and login system



\### Admin Features

\- Secure admin login

\- Complete product management (Add, Edit, Delete)

\- View all products in organized inventory table

\- Manage stock in real time

\- Cannot access shopping cart or checkout



\### Technical Features

\- RESTful API integration between frontend and Spring Boot backend

\- Role-based access control for customers and admins

\- Hibernate/JPA for database operations

\- Cross-Origin support for frontend-backend integration

\- Responsive design for desktop and mobile

\- Smooth animations and modern UI with a consistent color scheme



---



\## API Endpoints



\### Product Endpoints

\- `GET /products/allProduct` – List all products

\- `GET /products/{id}` – Get product by ID

\- `POST /products/addProduct` – Add new product (Admin only)

\- `PUT /products/updateProduct/{id}` – Update product details (Admin only)

\- `DELETE /products/deleteProduct/{id}` – Delete product (Admin only)



\### User Endpoints

\- `GET /users/allUsers` – List all users

\- `GET /users/{id}` – Get user by ID

\- `POST /users/addUser` – Register a new user



\### Cart Endpoints

\- `POST /cart/addToCart` – Add item to cart

\- `GET /cart/user/{userId}` – Get user's cart items

\- `PUT /cart/updateCart/{cartId}` – Update cart item quantity

\- `DELETE /cart/delete/{cartId}` – Remove cart item

\- `DELETE /cart/clear/{userId}` – Clear user's cart



\### Order Endpoints

\- `POST /orders/checkout/{userId}` – Place order



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



\## Color Scheme (Frontend)

\- \*\*Primary Dark\*\*: #0A2647 (Headers, footers)

\- \*\*Primary Blue\*\*: #144272

\- \*\*Light Blue\*\*: #E8F1F5 (Body background)

\- \*\*Accent Blue\*\*: #2C74B3 (Buttons, highlights)

\- \*\*Text Dark\*\*: #1A1A1A (Main text)



---



\## Testing the Application



1\. \*\*Customer Flow\*\*

&nbsp;  - Browse products on the home page

&nbsp;  - View product details

&nbsp;  - Login/register as a customer

&nbsp;  - Add items to cart

&nbsp;  - Update quantities or remove items

&nbsp;  - Checkout and place an order



2\. \*\*Admin Flow\*\*

&nbsp;  - Login as admin

&nbsp;  - View all products in the dashboard

&nbsp;  - Add, edit, or delete products

&nbsp;  - Manage inventory



3\. \*\*API Testing\*\*

&nbsp;  - Use \*\*Postman\*\* or \*\*Insomnia\*\* to test backend endpoints

&nbsp;  - Example to add a product:



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



---



\*\*Ultrix Shoe Palace\*\* - Premium Footwear E-Commerce Platform

