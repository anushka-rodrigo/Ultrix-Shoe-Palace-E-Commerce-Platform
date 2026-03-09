# Ultrix Shoe Palace - Spring Boot Backend

The backend of **Ultrix Shoe Palace** is a robust Spring Boot application that powers a premium footwear e-commerce platform. It provides RESTful APIs for managing products, users, carts, and orders, featuring role-based access control for customers and administrators.

---

## Features

### Customer Features
* **Product Discovery:** View the full catalog or individual product details.
* **Cart Management:** Add, update, or remove items from a personal shopping cart.
* **Checkout:** Seamlessly convert cart items into orders.

### Admin Features
* **Inventory Control:** Full CRUD (Create, Read, Update, Delete) operations for products.
* **Stock Management:** Real-time updates to product details and inventory levels.
* **Secure Access:** Restricted endpoints for administrative operations.

### Technical Highlights
* **RESTful Architecture:** Clean API design for easy frontend integration.
* **Security:** Role-based access control (**CUSTOMER** vs **ADMIN**).
* **Persistence:** MySQL database integration using Hibernate/JPA.
* **Error Handling:** Global exception handling for invalid requests and edge cases.
* **CORS Support:** Configured for seamless communication with modern frontend frameworks.

---

## API Endpoints

### Product Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/products/allProduct` | List all available products | Public |
| `GET` | `/products/{id}` | Get specific product details | Public |
| `POST` | `/products/addProduct` | Add a new product | Admin |
| `PUT` | `/products/updateProduct/{id}` | Update product details | Admin |
| `DELETE` | `/products/deleteProduct/{id}` | Remove a product | Admin |

### User Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users/allUsers` | List all registered users |
| `GET` | `/users/{id}` | Get user profile by ID |
| `POST` | `/users/addUser` | Register a new user account |

### Cart Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/cart/addToCart` | Add a product to the cart |
| `GET` | `/cart/user/{userId}` | Retrieve a user's current cart |
| `PUT` | `/cart/updateCart/{cartId}` | Modify item quantity in cart |
| `DELETE` | `/cart/delete/{cartId}` | Remove a specific item |
| `DELETE` | `/cart/clear/{userId}` | Empty the entire cart |

### Order Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/orders/checkout/{userId}` | Process checkout and create order |

---

## User Roles

### Customer (CUS)
* Browse and search products.
* Manage personal shopping cart.
* Place and finalize orders.

### Admin (ADMIN)
* Full Product Management (CRUD).
* Inventory oversight.
* *Note: Admins do not have access to cart or checkout functionalities.*

---

## Testing the Backend

You can use tools like **Postman** or **Insomnia** to test the API.

### Example: Adding a Product
**Endpoint:** `POST /products/addProduct`

**Payload:**
```json
{
  "name": "Ultrix Runner",
  "brand": "Ultrix",
  "price": 5000.00,
  "size": 42,
  "cat": "men",
  "stock": 50,
  "imgURL": "imgs/imgName.imgExtension",
  "description": "Premium running shoe"
}
```

---

## Future Enhancements

* JWT Authentication: Implementing stateless role-based security.
* Admin Dashboard: Visual analytics for sales and inventory.
* Order History: Detailed logs for previous customer purchases.
* Payment Integration: Connecting Stripe or PayPal for real transactions.

---

**Ultrix Shoe Palace** - Premium Footwear E-Commerce Platform
