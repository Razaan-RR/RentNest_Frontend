# RentNest Frontend API Integration Documentation

## Overview

This document describes the integration between the RentNest frontend application and backend API services.

The frontend is built using:

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- React Hook Form
- Zod Validation

The backend provides REST APIs with JWT-based authentication and role-based access control.

---

# API Base Configuration

All API requests are handled through:

```
src/lib/api.ts
```

Example:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# Authentication Flow

## Login

### Frontend

```
src/app/(auth)/login/page.tsx

Component:
components/auth/LoginForm.tsx
```

### Service

```
src/lib/auth.ts
```

### Backend Endpoint

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | `/auth/login` | Authenticate user |

---

## Register

### Frontend

```
src/app/(auth)/register/page.tsx

Component:
components/auth/RegisterForm.tsx
```

### Backend Endpoint

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/auth/register` | Create new account |

---

## Current User

Used for authentication state.

Backend:

| Method | Endpoint   | Description        |
| ------ | ---------- | ------------------ |
| GET    | `/auth/me` | Get logged-in user |

---

# Role Based Access Control

The application supports three roles:

```
ADMIN
LANDLORD
TENANT
```

Frontend protection:

```
src/proxy.ts
```

Dashboard routes:

```
/dashboard/admin
/dashboard/landlord
/dashboard/tenant
```

---

# Admin API Integration

## Admin Dashboard

Frontend:

```
src/app/dashboard/admin/page.tsx
```

Service:

```
services/admin.service.ts
```

Endpoint:

| Method | Endpoint       | Purpose              |
| ------ | -------------- | -------------------- |
| GET    | `/admin/stats` | Dashboard statistics |

---

# User Management

Frontend:

```
src/app/dashboard/admin/users/page.tsx
```

Service:

```
getAdminUsers()
updateUserStatus()
```

API:

| Method | Endpoint           | Purpose            |
| ------ | ------------------ | ------------------ |
| GET    | `/admin/users`     | Get all users      |
| PATCH  | `/admin/users/:id` | Update user status |

---

# Admin Property Management

Frontend:

```
src/app/dashboard/admin/properties/page.tsx
```

Service:

```
getAdminProperties()
```

API:

| Method | Endpoint            | Purpose             |
| ------ | ------------------- | ------------------- |
| GET    | `/admin/properties` | View all properties |

---

# Admin Rental Management

Frontend:

```
src/app/dashboard/admin/rentals/page.tsx
```

API:

| Method | Endpoint         | Purpose              |
| ------ | ---------------- | -------------------- |
| GET    | `/admin/rentals` | View rental requests |

---

# Category Management

Frontend:

```
src/app/dashboard/admin/categories/page.tsx
```

Service:

```
services/category.service.ts
```

API:

| Method | Endpoint          | Purpose         |
| ------ | ----------------- | --------------- |
| GET    | `/categories`     | Get categories  |
| POST   | `/categories`     | Create category |
| PUT    | `/categories/:id` | Update category |
| DELETE | `/categories/:id` | Delete category |

---

# Profile Management

Frontend:

Admin:

```
dashboard/admin/profile/page.tsx
```

Landlord:

```
dashboard/landlord/profile/page.tsx
```

Tenant:

```
dashboard/tenant/profile/page.tsx
```

Service:

```
profile.service.ts
```

API:

| Method | Endpoint   | Purpose        |
| ------ | ---------- | -------------- |
| GET    | `/profile` | Get profile    |
| PATCH  | `/profile` | Update profile |

---

# Property API Integration

## Public Property Listing

Frontend:

```
src/app/properties/page.tsx
```

Service:

```
property.service.ts
```

API:

| Method | Endpoint      | Purpose            |
| ------ | ------------- | ------------------ |
| GET    | `/properties` | Get all properties |

---

## Property Details

Frontend:

```
src/app/properties/[id]/page.tsx
```

API:

| Method | Endpoint          | Purpose              |
| ------ | ----------------- | -------------------- |
| GET    | `/properties/:id` | Get property details |

---

# Landlord Property Management

## View My Properties

Frontend:

```
dashboard/landlord/properties/page.tsx
```

API:

| Method | Endpoint                             |
| ------ | ------------------------------------ |
| GET    | `/properties/landlord/my-properties` |

---

## Create Property

Frontend:

```
dashboard/landlord/properties/create/page.tsx

Component:
PropertyForm.tsx
```

API:

| Method | Endpoint      |
| ------ | ------------- |
| POST   | `/properties` |

---

## Update Property

Frontend:

```
dashboard/landlord/properties/[id]/edit/page.tsx
```

API:

| Method | Endpoint          |
| ------ | ----------------- |
| PUT    | `/properties/:id` |

---

## Delete Property

Component:

```
PropertyCard.tsx
```

API:

| Method | Endpoint          |
| ------ | ----------------- |
| DELETE | `/properties/:id` |

---

# Rental Request API Integration

## Tenant Create Rental Request

Frontend:

```
components/rental/RentalRequestForm.tsx
```

API:

| Method | Endpoint   |
| ------ | ---------- |
| POST   | `/rentals` |

---

## Tenant Rental Requests

Frontend:

```
dashboard/tenant/requests/page.tsx
```

API:

| Method | Endpoint   |
| ------ | ---------- |
| GET    | `/rentals` |

---

## Landlord Incoming Requests

Frontend:

```
dashboard/landlord/requests/page.tsx
```

API:

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/rentals/landlord` |

---

## Update Rental Status

Landlord actions:

```
APPROVE
REJECT
COMPLETED
```

API:

| Method | Endpoint       |
| ------ | -------------- |
| PATCH  | `/rentals/:id` |

---

# Payment API Integration

Frontend:

```
dashboard/tenant/payments/page.tsx

success/page.tsx
```

Service:

```
payment.service.ts
```

---

## Create Payment

API:

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/payments/create` |

Purpose:

Creates checkout session after rental approval.

---

## Confirm Payment

Frontend:

```
success/page.tsx
```

API:

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | `/payments/confirm` |

---

## Payment History

API:

| Method | Endpoint    |
| ------ | ----------- |
| GET    | `/payments` |

---

## Single Payment

API:

| Method | Endpoint        |
| ------ | --------------- |
| GET    | `/payments/:id` |

---

# Review API Integration

Frontend:

Property details page:

```
properties/[id]/page.tsx
```

Components:

```
PropertyReviews.tsx
```

---

## Create Review

API:

| Method | Endpoint   |
| ------ | ---------- |
| POST   | `/reviews` |

---

## Get Property Reviews

API:

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | `/reviews/property/:id` |

---

## My Reviews

API:

| Method | Endpoint      |
| ------ | ------------- |
| GET    | `/reviews/my` |

---

# Frontend Route Summary

| Route                                     | Access   |
| ----------------------------------------- | -------- |
| `/login`                                  | Public   |
| `/register`                               | Public   |
| `/properties`                             | Public   |
| `/properties/:id`                         | Public   |
| `/dashboard/admin`                        | Admin    |
| `/dashboard/admin/users`                  | Admin    |
| `/dashboard/admin/categories`             | Admin    |
| `/dashboard/admin/properties`             | Admin    |
| `/dashboard/admin/rentals`                | Admin    |
| `/dashboard/landlord`                     | Landlord |
| `/dashboard/landlord/properties`          | Landlord |
| `/dashboard/landlord/properties/create`   | Landlord |
| `/dashboard/landlord/properties/:id/edit` | Landlord |
| `/dashboard/landlord/requests`            | Landlord |
| `/dashboard/tenant`                       | Tenant   |
| `/dashboard/tenant/requests`              | Tenant   |
| `/dashboard/tenant/payments`              | Tenant   |

---

# Error Handling

API errors are handled using:

```
toast notifications
```

Library:

```
sonner
```

Example:

- Failed login
- Unauthorized access
- Validation errors
- Payment failure

---

# Deployment Environment Variables

Required:

```
NEXT_PUBLIC_API_URL
```

Example:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

# Authentication Storage

Authentication data:

```
accessToken
```

stored using:

```
js-cookie
```

User information stored in:

```
localStorage
```

---

# Conclusion

The RentNest frontend consumes all required backend endpoints including:

- Authentication
- User management
- Property management
- Rental requests
- Payments
- Reviews
- Profile management
- Admin operations

All protected APIs use JWT authentication and role-based authorization.
