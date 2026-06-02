# Telecaller Backend API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express.js](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Render](https://img.shields.io/badge/Hosted%20on-Render-blue)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-blue)
![Brevo](https://img.shields.io/badge/Email-Brevo-orange)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

# Telecaller CRM Backend

Production-ready backend API for the Telecaller CRM application.

The backend powers:

- User Authentication
- OTP Verification
- Lead Management
- Activity Tracking
- Campaign Management
- Donation Management
- Donor Records
- Prasadam Management
- Dashboard Analytics
- Message Templates
- User Profile Management
- Application Settings
- Email Notifications

---

# Live Deployment

### Production API

https://telecaller-bn20.onrender.com

### Health Check

GET https://telecaller-bn20.onrender.com/

Expected Response:

{
  "status": "Telecaller API running 🚀"
}

---

# Architecture

Android App (Jetpack Compose)
            │
            ▼
     Telecaller Backend
      (Node.js + Express)
            │
   ┌────────┼────────┬─────────┐
   ▼        ▼        ▼         ▼
MongoDB  Cloudinary Brevo    JWT
 Atlas    Storage   Email    Auth

---

# Features

## Authentication

- User Registration
- Email OTP Verification
- Login Authentication
- JWT Access Tokens
- Refresh Tokens
- Forgot Password
- Password Reset

## Lead Management

- Create Leads
- Update Leads
- Delete Leads
- Lead Status Tracking
- Follow-up Management
- Lead Activity History
- Lead Image Uploads

## Campaign Management

- Create Campaigns
- View Campaigns
- Delete Campaigns

## Donation Management

- Record Donations
- Donation History
- Donor Search
- Donation Analytics

## Donor Management

- Donor Profiles
- Donation Tracking
- Mobile Number Search

## Prasadam Management

- Create Prasadam Records
- View Prasadam History
- User-wise Tracking

## Dashboard

- Lead Statistics
- Donation Statistics
- Activity Statistics
- Recent Updates

## Message Templates

- WhatsApp Templates
- SMS Templates
- Reusable Messages

## Profile Management

- Update Profile
- Profile Image Upload

## Settings

- Notification Preferences
- FCM Token Storage
- Update Profile
- Change Password

---

# Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose ODM

## Authentication

- JWT
- bcryptjs

## File Uploads

- Multer
- Cloudinary

## Email Service

- Brevo Transactional Email API
- Custom Domain Email

## Security

- Helmet
- Express Rate Limit
- CORS Protection

## Deployment

- Render

---

# Email Infrastructure

Transactional emails are sent through Brevo using a custom domain.

### Domain

telecallerproject.online

### Sender Email

noreply@telecallerproject.online

### Email Use Cases

- OTP Verification
- Password Reset
- Login Security Notifications

### Deliverability Features

- SPF Records
- DKIM Authentication
- DMARC Protection
- Dedicated Domain Identity

---

# Project Structure

Telecaller-Backend/
│
├── src/
│
├── config/
│   ├── db.js
│   ├── cloudinary.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── dashboardController.js
│   ├── leadController.js
│   ├── profile.controller.js
│   ├── prasadamController.js
│   ├── settingsController.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── upload.js
│   ├── upload.middleware.js
│
├── models/
│   ├── User.js
│   ├── Lead.js
│   ├── Activity.js
│   ├── Campaign.js
│   ├── Donation.js
│   ├── Donor.js
│   ├── Prasadam.js
│   ├── Issue.js
│   └── MessageTemplate.js
│
├── routes/
│   ├── auth.routes.js
│   ├── leadRoutes.js
│   ├── activity.routes.js
│   ├── dashboardRoutes.js
│   ├── campaignRoutes.js
│   ├── donationRoutes.js
│   ├── donorRoutes.js
│   ├── profile.routes.js
│   ├── prasadamRoutes.js
│   ├── settingsRoutes.js
│   └── messageTemplateRoutes.js
│
├── utils/
│   ├── email.js
│   ├── token.js
│
├── .env
├── package.json
├── server.js
└── README.md

---

# Installation

## Clone Repository


git clone https://github.com/YOUR_USERNAME/telecaller-backend.git


cd telecaller-backend


---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=7001

MONGO_URI=

JWT_SECRET=
JWT_REFRESH_SECRET=

BREVO_API_KEY=
BREVO_EMAIL=noreply@telecallerproject.online
BREVO_SENDER_NAME=Telecaller OTP

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Run Application

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

Local URL:

```bash
http://localhost:7001
```

---

# Authentication

Protected routes require a JWT token.

Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...
```

---

# API Endpoints

## Authentication

Base URL

```bash
/api/auth
```

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /register | Register User |
| POST | /verify-otp | Verify OTP |
| POST | /login | Login User |
| POST | /forgot-password | Send Reset Email |
| POST | /reset-password | Reset Password |

---

## Leads

Base URL

```bash
/api/leads
```

| Method | Endpoint |
|----------|----------|
| POST | / |
| GET | / |
| GET | /:id |
| PUT | /:id |
| DELETE | /:id |

---

## Activities

Base URL

```bash
/api/activities
```

| Method | Endpoint |
|----------|----------|
| POST | /leads/:leadId/activities |
| GET | /leads/:leadId/activities |

---

## Dashboard

Base URL

```bash
/api/dashboard
```

| Method | Endpoint |
|----------|----------|
| GET | /stats |
| GET | /activities |

---

## Campaigns

Base URL

```bash
/api/campaigns
```

| Method | Endpoint |
|----------|----------|
| GET | / |
| POST | / |
| DELETE | /:id |

---

## Donations

Base URL

```bash
/api/donations
```

| Method | Endpoint |
|----------|----------|
| POST | / |
| GET | / |
| GET | /my |
| GET | /donor/:mobile |

---

## Donors

Base URL

```bash
/api/donors
```

| Method | Endpoint |
|----------|----------|
| GET | /my |
| PUT | /:mobile |

---

## Prasadam

Base URL

```bash
/api/prasadam
```

| Method | Endpoint |
|----------|----------|
| POST | / |
| GET | / |

---

## Profile

Base URL

```bash
/api/profile
```

| Method | Endpoint |
|----------|----------|
| GET | / |
| PUT | / |

---

## Message Templates

Base URL

```bash
/api/message-templates
```

| Method | Endpoint |
|----------|----------|
| GET | / |
| POST | / |
| PUT | /:id |
| DELETE | /:id |

---

## Settings

Base URL

```bash
/api/settings
```

| Method | Endpoint |
|----------|----------|
| GET | / |
| POST | /update |
| POST | /fcm |
| POST | /report |

---

# File Upload Support

Supported uploads:

- Profile Images
- Lead Images
- Attachments

Storage Provider:

```text
Cloudinary
```

Request Type:

```http
multipart/form-data
```

---

# Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Helmet Security Headers
- Rate Limiting
- MongoDB Validation
- Environment Variable Protection
- Protected Routes

---

# Deployment

### Backend Hosting

Render

### Database

MongoDB Atlas

### Media Storage

Cloudinary

### Email Provider

Brevo

### Domain

telecallerproject.online

### Production API

https://telecaller-bn20.onrender.com

---

# Future Enhancements

- WhatsApp Business API Integration
- Push Notifications
- Role Based Access Control (RBAC)
- Advanced Analytics
- Audit Logs
- Bulk Messaging System

---

# License

MIT License

---

# Author

### Telecaller CRM Backend

Built using:

- Node.js
- Express.js
- MongoDB Atlas
- Cloudinary
- Brevo Email API
- JWT Authentication
- Render Hosting

Production API:

https://telecaller-bn20.onrender.com

Email Domain:

noreply@telecallerproject.online
