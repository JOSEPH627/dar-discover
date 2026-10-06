# DAR DISCOVER 🌍

> 🚧 **Work in Progress**

DAR DISCOVER is a tourism and activities platform designed to help people
discover places, activities, events, food & drink venues, attractions,
and experiences in Dar es Salaam, Tanzania.

The project is currently under active development.

---

## 📌 Project Status

**Work in Progress — Not a finished production system.**

The platform is being developed step by step, starting with the
user-facing experience before moving to provider and administration
features.

---

## ✨ Current Features

- 🔐 User authentication
- 👤 User profile and personal details
- 📍 Location and "Near You" functionality
- 🗺️ Map integration
- 🔎 Discover and explore experiences
- 🏷️ Categories
- ⭐ Popular places and activities
- 📅 Happening Soon
- 💰 Explore by budget
- ❤️ Saved experiences
- 📝 Reviews
- 📋 User bookings
- 🔔 Notifications
- 📱 Responsive user interface

---

## 🚧 Planned Features

- 🏢 Provider dashboard
- ⚙️ Admin dashboard
- 📍 Advanced location-based discovery
- 🗺️ Advanced maps and route planning
- 📅 Events management
- 🎟️ Booking management
- 💳 Payment integration
- ⭐ Ratings and reviews management
- 🔔 Advanced notifications
- 📊 Provider and admin analytics
- 👥 Provider management

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- JavaScript
- JSX
- Tailwind CSS

### Backend
- Next.js API Routes
- Prisma ORM

### Database
- MariaDB

### Authentication
- HTTP-only session cookies
- Password hashing with bcryptjs

### Development Tools
- VS Code
- Git
- GitHub
- npm

---

## 📂 Project Structure

```text
dar-discover/
│
├── app/
│   ├── api/
│   ├── user/
│   ├── layout.js
│   └── globals.css
│
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Categories.jsx
│   ├── DiscoverNearYou.jsx
│   ├── PopularInDar.jsx
│   ├── HappeningSoon.jsx
│   ├── ExploreByBudget.jsx
│   ├── SpecialOffers.jsx
│   ├── MapAndPlan.jsx
│   └── ...
│
├── lib/
│   ├── auth.jsx
│   ├── location.jsx
│   └── prisma.jsx
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
│
├── package.json
└── README.md