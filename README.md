<div align="center">

# 🔧 FixPoint

### 🏠 Your Trusted Home Service Platform

A scalable RESTful API for a home service marketplace where customers can find trusted technicians, book services, make secure online payments, and leave reviews after successful job completion.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![SSLCommerz](https://img.shields.io/badge/SSLCommerz-00A651?style=for-the-badge)

</div>

---

# 📖 Overview

**FixItNow** is a scalable backend REST API built for a home service marketplace.

The platform connects customers with professional technicians for different home services like electrical work, plumbing, painting, cleaning, AC servicing, and more.

Customers can book technicians, complete secure online payments, track booking progress, and leave reviews after service completion.

Technicians can manage their services, availability, and booking requests while administrators control users, categories, and the overall platform.

---

# 🚀 Live Links

| Resource | Link |
|----------|------|
| Live Link | [https://fixit-backend-six.vercel.app](https://fixit-backend-six.vercel.app) |
| Postman | https://documenter.getpostman.com/view/54723337/2sBY4Mv1mK |
| Repository | [https://github.com/yasirarafatalif/FixPoint_Backend.git](https://github.com/yasirarafatalif/FixPoint_Backend.git) |
| Demo Admin | testadmin@gmail.com |
| Demo Admin Password | 123123 |
| Explain Viedo | [Viedo Link](https://www.loom.com/share/5287730f63084055b22b89fee9634435) |

---

# ✨ Core Features

## 🌍 Public

- Browse services
- Search technicians
- Filter by category
- Filter by location
- Filter by rating
- View technician profile
- Read customer reviews

---

## 👤 Customer

- JWT Authentication
- Book technician
- Cancel booking before service starts
- Online Payment
- Booking history
- Payment history
- Review technician
- Profile management

---

## 🛠 Technician

- Create profile
- Add services
- Manage pricing
- Manage availability
- Accept bookings
- Reject bookings
- Update booking status
- Complete jobs

---

## 👨‍💼 Admin

- View all users
- Ban / Unban users
- Manage categories
- View all bookings
- Platform management

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- bcrypt

## Validation

- Zod

## Payment Gateway

- Stripe
- SSLCommerz

## Development Tools

- ESLint
- Prettier
- dotenv
- Cookie Parser

---

# 📁 Project Structure

```
src
│
├── app
│   ├── modules
│   │     ├── auth
│   │     ├── user
│   │     ├── technician
│   │     ├── booking
│   │     ├── payment
│   │     ├── category
│   │     ├── review
│   │     └── service
│   │
│   ├── middleware
│   ├── config
│   ├── utils
│   └── errors
│
├── prisma
│
├── app.ts
└── server.ts
```

---

# 👥 User Roles

| Role | Description |
|------|-------------|
| Customer | Book services |
| Technician | Provide services |
| Admin | Manage platform |

---

# 📊 Booking Workflow

```text
Customer
      │
      ▼
Browse Services
      │
      ▼
Book Technician
      │
      ▼
Technician Accepts
      │
      ▼
Online Payment
      │
      ▼
Job In Progress
      │
      ▼
Completed
      │
      ▼
Leave Review
```

---

# 💳 Payment Flow

```text
Booking Accepted
        │
        ▼
Create Payment
        │
        ▼
Stripe / SSLCommerz
        │
        ▼
Payment Verification
        │
        ▼
Update Booking
        │
        ▼
Store Transaction
```

---

# 🔄 Booking Status

```text
REQUESTED

      │

      ▼

ACCEPTED

      │

      ▼

PAID

      │

      ▼

IN_PROGRESS

      │

      ▼

COMPLETED
```

Alternative

```text
REQUESTED

      │

      ▼

DECLINED
```

---

# 🗄 Database Models

- Users
- Technician Profiles
- Categories
- Services
- Bookings
- Payments
- Reviews

---

# 🔐 Authentication

Protected APIs require

```
Authorization: Bearer <access_token>
```

JWT is used for authentication and role-based authorization.

---

# 📮 API Modules

```
Authentication

Users

Services

Technicians

Bookings

Payments

Reviews

Categories

Admin
```

---

# ⚙️ Installation

Clone repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
```

Go inside project

```bash
cd YOUR_REPO_NAME
```

Install packages

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Run Development Server

```bash
npm run dev
```

---

# 🌍 Environment Variables

Create a `.env` file.

```env
PORT=

DATABASE_URL=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

BCRYPT_SALT_ROUNDS=

SSL_STORE_ID=

SSL_STORE_PASSWORD=

STRIPE_SECRET_KEY=

FRONTEND_URL=

BACKEND_URL=
```

---

# 🧪 Testing

You can test APIs using

- Postman
- Thunder Client
- Insomnia

---

# 📌 Future Improvements

- Email Notification
- Push Notification
- Technician Live Location
- Admin Analytics Dashboard
- Coupon System
- Wallet System
- OTP Verification
- Chat System
- File Upload with Cloudinary

---

# 🤝 Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss your ideas.

---

# 👨‍💻 Author

### Yasir Arafat Alif

Backend Developer

**GitHub**

[https://github.com/YOUR_GITHUB_USERNAME](https://github.com/yasirarafatalif)

**LinkedIn**

https://linkedin.com/in/YOUR_LINKEDIN

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.

---

# 📄 License

This project is licensed under the MIT License.
