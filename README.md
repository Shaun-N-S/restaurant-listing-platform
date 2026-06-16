# 🍽️ ForkMap - Restaurant Listing Platform

A full-stack restaurant management application built with React, TypeScript, Node.js, Express, PostgreSQL, Sequelize, and Docker.

The application allows users to create, update, delete, search, and manage restaurant listings with image uploads and pagination support.

---

## Features

* Create, update, and delete restaurants
* Upload restaurant images
* Search restaurants
* Pagination
* Image validation
* File size restriction (5 MB)
* Frontend and backend validation using Zod
* API error handling
* Responsive UI
* React Query caching and optimistic updates

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* TanStack Query
* Axios
* React Hot Toast
* Zod

### Backend

* Node.js
* Express
* TypeScript
* PostgreSQL
* Sequelize
* Multer
* Cloudinary
* Zod

### DevOps

* Docker
* Docker Compose

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_db
DB_USER=postgres
DB_PASSWORD=your_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

## Local Setup

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:5000
```

---

## Docker Setup

Start backend and PostgreSQL:

```bash
cd Backend
docker-compose up --build
```

Stop containers:

```bash
docker-compose down
```

---

## API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | /restaurants     | Get all restaurants |
| POST   | /restaurants     | Create restaurant   |
| PUT    | /restaurants/:id | Update restaurant   |
| DELETE | /restaurants/:id | Delete restaurant   |

---

## Validation Rules

### Restaurant Name

* Minimum 2 characters
* Maximum 80 characters

### Address

* Minimum 5 characters
* Maximum 200 characters

### Contact Number

* Minimum 7 characters
* Maximum 20 characters

### Image Upload

Allowed formats:

* JPG
* JPEG
* PNG
* WEBP

Maximum size:

```txt
5 MB
```

---

## Build

### Backend

```bash
npm run build
```

### Frontend

```bash
npm run build
```
