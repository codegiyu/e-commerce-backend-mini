# E-commerce API Documentation

A robust RESTful API for e-commerce operations including user management, product catalog, order processing, and more.
[Base URL](#https://e-commerce-backend-mini-1.onrender.com/v1)

## 📑 Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Products](#products)
- [Categories](#categories)
- [Orders](#orders)
- [Coupons](#coupons)
- [Response formats](#response-formats)

## 🔐 Authentication

| Endpoint        | Method | Description          | Auth Required |
| --------------- | ------ | -------------------- | ------------- |
| `/auth/session` | GET    | Get current session  | No            |
| `/auth/signup`  | POST   | Register new user    | No            |
| `/auth/login`   | POST   | Authenticate user    | No            |
| `/auth/logout`  | POST   | End session          | Yes           |
| `/auth/refresh` | POST   | Refresh access token | No            |

### Request Examples

**Sign Up**

```json
POST /auth/signup
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Login**

```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

## 👥 Users

| Endpoint         | Method | Description      | Auth Required |
| ---------------- | ------ | ---------------- | ------------- |
| `/user/all`      | GET    | Get all users    | Admin         |
| `/user/:id`      | GET    | Get user details | Admin         |
| `/user/wishlist` | POST   | Add to wishlist  | Yes           |
| `/user/:id`      | PUT    | Update user      | Yes           |
| `/user/:id`      | DELETE | Delete user      | Admin         |

### Add to wishlist Request

```json
POST /user/wishlist
{
  "productId": "64b6f45bc547b49f81e0dabc"
}

```

### User Update Request

```json
PUT /user/:id
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348056789010",
  "address": {
    "street": "123 Main St",
    "city": "Boston",
    "state": "MA",
    "zipCode": "02101",
    "country": "USA"
  }
}
```

## 📦 Products

| Endpoint          | Method | Description         | Auth Required |
| ----------------- | ------ | ------------------- | ------------- |
| `/product/create` | POST   | Add product         | Admin         |
| `/product/:id`    | PUT    | Update product      | Admin         |
| `/product/all`    | GET    | Get all products    | No            |
| `/product/:id`    | GET    | Get product details | No            |
| `/product/:id`    | DELETE | Delete product      | Admin         |

### Product Creation Request

```json
POST /product/create
{
    "name": "MacBook Air 2019",
  "description": "Ultra-lightweight laptop for everyday tasks.",
  "price": [899.99],
  "countInStock": 25,
  "category": ["6706e455c3389f5c1768a7b3",],
  "rating": [],
  "img": [
    {
      "color": "Gold",
      "url": ["https://example.com/macbookair_gold1.jpg", "https://example.com/macbookair_gold2.jpg"]
    }
  ],
  "size": ["128GB"],
  "tag": "Old",
  "discount": 20
}
```

## 📁 Category

| Endpoint           | Method | Description          | Auth Required |
| ------------------ | ------ | -------------------- | ------------- |
| `/category/create` | POST   | Create category      | Admin         |
| `/category/:id`    | PUT    | Update category      | Admin         |
| `/category/:id`    | DELETE | Delete category      | Admin         |
| `/category/all`    | GET    | Get all categories   | No            |
| `/category/:id`    | GET    | Get category details | No            |

### Category Creation Request

```json
POST /category/create
{
  "name": "Electronics",
  "description": "Electronic devices and accessories",

}
```

## 🛍️ Orders

| Endpoint          | Method | Description           | Auth Required |
| ----------------- | ------ | --------------------- | ------------- |
| `/order`          | POST   | Create order          | Yes           |
| `/order/all`      | GET    | Get all orders        | Admin         |
| `/order/myorders` | GET    | Get user orders       | Yes           |
| `/order/:id`      | GET    | Get order details     | Yes           |
| `/order/:id/pay`  | PUT    | Update payment status | Yes           |

### Order Creation Request

```json
POST /order
{
  "items": [
    {
      "productId": "6706e455c3389f5c1768a7b3",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Boston",
    "state": "MA",
    "zipCode": "02101",
    "country": "USA"
  },
  "paymentMethod": "pay on delivery",
  "couponCode": "DISCOUNT20"
}
```

## 🎟️ Coupons

| Endpoint         | Method | Description        | Auth Required |
| ---------------- | ------ | ------------------ | ------------- |
| `/coupon/create` | POST   | Create coupon      | Admin         |
| `/coupon/:id`    | PUT    | Update coupon      | Admin         |
| `/coupon/:id`    | DELETE | Delete coupon      | Admin         |
| `/coupon/all`    | GET    | Get all coupons    | No            |
| `/coupon/:id`    | GET    | Get coupon details | No            |

### Coupon Creation Request

```json
POST /coupon/create
{
  "code": "SUMMER2025",
  "discount": 20,
  "startDate": "2025-06-01T00:00:00Z",
  "endDate": "2025-08-31T23:59:59Z",
  "maxUsage": 1000
}
```

## 📋 Response formats

### success Response Format

```json
{
  "success": true,
  "data": {},
  "message": "An action succesful message"
}
```

### failure Response Format

```json
{
  "success": false,
  "message": "An Error message"
}
```
