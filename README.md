# MERN---ECommerce


# Project Overview

## Backend Completed Work
- Admin login with email/password authentication.
- View registered users.
- Add products with stock management.
- Update stock levels.
- Register or log in using email/password.
- Browse products.

## Frontend Completed Work
- Login, register, and product display page design completed.
- User registration completed.
- Product stock-based display logic implemented.

---

# Installation & Setup

## Backend Setup
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

## Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

---

# API Endpoints

## Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - User login

## Product Management
- **POST** `/api/products` - Add a new product
- **GET** `/api/products` - Get all products
- **PUT** `/api/products/:id/stock` - Update stock

---

# Frontend Features
- User authentication (Login & Register)
- Display products with stock indicators:
  - If stock ≤ 10: "Only X stock is available."
  - If stock = 0: "Out of Stock."
- Responsive UI design

---

# Testing with Postman
1. Import the provided Postman collection.
2. Run the following test cases:
   - Register a new user.
   - Login as a user/admin.
   - Add a new product.
   - Retrieve the product list.
   - Update product stock.

---

# Future Enhancements
- Implement role-based access control (RBAC)
- Add product categories & filtering
- Improve UI/UX with better styling
- Integrate payment gateway for purchases

