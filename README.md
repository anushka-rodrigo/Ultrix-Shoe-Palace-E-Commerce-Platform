# Ultrix Shoe Palace - Premium Footwear E-Commerce Platform

**Student Name:** M.A.O.Rodrigo  
**University Index Number:** FC221019 

Ultrix Shoe Palace is a complete e-commerce web application for premium footwear. The project consists of a **Spring Boot backend** with a MySQL database and a **responsive frontend** built with HTML, CSS, and JavaScript. The platform allows customers to browse and purchase shoes while providing admins with full product management capabilities.

---

## Project Overview

* **Frontend**: Modern, responsive interface with product browsing, cart management, and checkout features.
* **Backend**: Spring Boot RESTful API providing product, user, cart, and order management with role-based access control.
* **Database**: MySQL used to store all application data including products, users, carts, and orders.

The frontend and backend work together to deliver a seamless shopping experience with secure customer and admin operations.



---

## Features

### Customer Features
* **Browse Products**: Filter by category (Men, Women, Kids, Sports, Casual, Formal).
* **Product Details**: View high-quality images, descriptions, and pricing.
* **Filtering**: Sort products by category, price, and name.
* **Shopping Cart**: Add products, update quantities, or remove items.
* **Secure Checkout**: Streamlined order placement system.
* **User Accounts**: Full registration and login system.

### Admin Features
* **Secure Dashboard**: Dedicated admin login access.
* **Inventory Management**: Full CRUD (Create, Read, Update, Delete) capabilities for products.
* **Stock Tracking**: Manage inventory levels in real time via an organized table.
* **Access Control**: Admins are restricted from shopping functions to ensure data integrity.

### Technical Features
* **RESTful API**: Clean integration between the frontend and Spring Boot services.
* **Role-Based Access Control (RBAC)**: Distinct permissions for Customers and Admins.
* **Hibernate/JPA**: Efficient database operations and mapping.
* **Cross-Origin (CORS)**: Pre-configured support for frontend-backend communication.
* **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

---

## API Endpoints

### Product Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/products/allProduct` | List all products |
| GET | `/products/{id}` | Get product by ID |
| POST | `/products/addProduct` | Add new product (Admin) |
| PUT | `/products/updateProduct/{id}` | Update product details (Admin) |
| DELETE | `/products/deleteProduct/{id}` | Delete product (Admin) |

### User Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/users/allUsers` | List all users |
| GET | `/users/{id}` | Get user by ID |
| POST | `/users/addUser` | Register a new user |

### Cart Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/cart/addToCart` | Add item to cart |
| GET | `/cart/user/{userId}` | Get user's cart items |
| PUT | `/cart/updateCart/{cartId}` | Update item quantity |
| DELETE | `/cart/delete/{cartId}` | Remove cart item |
| DELETE | `/cart/clear/{userId}` | Clear user's cart |

### Order Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/orders/checkout/{userId}` | Place order |

---

## User Roles

### Customer (CUS)
* Browse products and view details.
* Manage personal shopping cart.
* Place and view orders.

### Admin (ADMIN)
* Manage entire product inventory.
* Monitor stock levels.
* Restricted from customer-side shopping features.

---

## Color Scheme (Frontend)

The UI utilizes a professional blue-centric palette:
* **Primary Dark**: `#0A2647` (Headers & Footers)
* **Primary Blue**: `#144272` (Navigation Elements)
* **Light Blue**: `#E8F1F5` (Main Background)
* **Accent Blue**: `#2C74B3` (Buttons & Highlights)
* **Text Dark**: `#1A1A1A` (Primary Typography)

---

## Testing the Application

### 1. Customer Flow
* Browse products on the home page.
* View product details.
* Register/Login as a customer.
* Add items to the cart and modify quantities.
* Proceed to checkout to place an order.

### 2. Admin Flow
* Login with Admin credentials.
* Access the product dashboard.
* Perform Add, Edit, or Delete operations on the inventory.

### 3. API Testing
Use **Postman** or **Insomnia** to test backend endpoints. Example payload to add a product:

```json
POST /products/addProduct
{
  "name": "Ultrix Runner",
  "brand": "Ultrix",
  "price": 5000.00,
  "size": 42,
  "cat": "men",
  "stock": 50,
  "imgURL": "[https://example.com/img/shoe.jpg](https://example.com/img/shoe.jpg)",
  "description": "Premium running shoe"
}
```

---

**Ultrix Shoe Palace** - Premium Footwear E-Commerce Platform
