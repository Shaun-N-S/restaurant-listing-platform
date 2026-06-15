# 🍽️ ForkMap - Restaurant Listing Platform

A full-stack Restaurant Listing Platform built using React, Node.js, Express, PostgreSQL, Sequelize, and TypeScript.

ForkMap allows users to create, view, update, delete, search, and manage restaurant listings with image uploads and pagination support.

---

## 🚀 Features

### Restaurant Management
- View all restaurants
- Add new restaurants
- Edit existing restaurants
- Delete restaurants
- Upload restaurant images

### Search & Pagination
- Debounced search functionality
- Server-side pagination
- Dynamic restaurant filtering

### Validation & Error Handling
- Frontend validation using Zod
- Backend validation using Zod
- Image type validation
- Image size validation
- Proper API error handling
- User-friendly error messages

### UI/UX
- Responsive design
- Modern dark-themed interface
- Loading states
- Delete confirmation modal
- Toast notifications
- Empty state handling

### Performance
- React Query caching
- Optimistic updates
- Debounced API requests
- Production-ready build

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query (TanStack Query)
- Axios
- React Hot Toast
- Zod

## Backend

- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- PostgreSQL
- Multer
- Cloudinary
- Zod
- CORS
- dotenv

## DevOps

- Docker
- Docker Compose

---

# 📁 Project Structure

```txt
ForkMap
│
├── Backend
│   ├── src
│   │   ├── controllers
│   │   ├── services
│   │   ├── repositories
│   │   ├── routes
│   │   ├── middlewares
│   │   ├── validators
│   │   ├── models
│   │   ├── config
│   │   ├── constants
│   │   ├── utils
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── constants
│   │   ├── types
│   │   ├── utils
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

# 📸 Screenshots

Add screenshots here before submission.

## Home Page

![Home](./screenshots/home.png)

## Add Restaurant

![Add Restaurant](./screenshots/add-restaurant.png)

## Edit Restaurant

![Edit Restaurant](./screenshots/edit-restaurant.png)

## Delete Restaurant

![Delete Restaurant](./screenshots/delete-restaurant.png)

---

# ⚙️ Environment Variables

## Backend (.env)

Create a `.env` file inside the Backend folder.

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

---

## Frontend (.env)

Create a `.env` file inside the Frontend folder.

```env
VITE_API_URL=http://localhost:5000
```

---

# 🏃 Local Installation

## 1. Clone Repository

```bash
git clone <repository-url>
```

```bash
cd ForkMap
```

---

## 2. Backend Setup

```bash
cd Backend
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Backend

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 3. Frontend Setup

```bash
cd Frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Frontend

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 🐳 Docker Setup

The backend and PostgreSQL database can be started using Docker Compose.

## Start Containers

```bash
cd Backend

docker-compose up --build
```

---

## Stop Containers

```bash
docker-compose down
```

---

## Docker Services

### PostgreSQL

```yaml
postgres:
  image: postgres:15
```

Runs on:

```txt
localhost:5432
```

---

### Backend

```yaml
backend:
  build: .
```

Runs on:

```txt
localhost:5000
```

---

# 📡 API Endpoints

## Get Restaurants

```http
GET /restaurants
```

### Query Parameters

```txt
q
page
limit
```

---

## Create Restaurant

```http
POST /restaurants
```

### Form Data

```json
{
  "name": "The Golden Fork",
  "address": "42 Oak Street",
  "contact": "+91 9876543210",
  "image": "file"
}
```

---

## Update Restaurant

```http
PUT /restaurants/:id
```

### Form Data

```json
{
  "name": "Updated Restaurant",
  "address": "Updated Address",
  "contact": "+91 9876543210",
  "image": "file"
}
```

---

## Delete Restaurant

```http
DELETE /restaurants/:id
```

---

# 🗄️ Database Schema

## Restaurants Table

| Field | Type |
|---------|---------|
| id | Integer |
| name | String |
| address | String |
| contact | String |
| imageUrl | String |
| createdAt | Date |
| updatedAt | Date |

---

# ✅ Validation Rules

## Restaurant Name

- Minimum 2 characters
- Maximum 80 characters

---

## Address

- Minimum 5 characters
- Maximum 200 characters

---

## Contact Number

- Minimum 7 characters
- Maximum 20 characters

---

## Image Upload

Allowed Types:

- JPG
- JPEG
- PNG
- WEBP

Maximum Size:

```txt
5 MB
```

---

# 🔒 Error Handling

The application handles:

- Validation errors
- Invalid IDs
- Invalid pagination values
- Image upload failures
- Unsupported image formats
- File size violations
- Cloudinary upload errors
- Internal server errors

---

# 📦 Available Scripts

## Backend

```bash
npm run dev
npm run build
npm start
```

---

## Frontend

```bash
npm run dev
npm run build
npm run preview
```

---

# 🎯 Assignment Requirements Covered

✅ Show Restaurants

✅ Add Restaurants

✅ Update Restaurants

✅ Delete Restaurants

✅ PostgreSQL Database

✅ Sequelize ORM

✅ Axios API Calls

✅ Responsive UI

✅ Search Functionality

✅ Pagination

✅ Image Upload

✅ Validation

✅ Error Handling

✅ Docker Support

✅ TypeScript

---

# 👨‍💻 Author

### Shaun N S

MERN Stack Developer

---

## 📌 Project Status

Machine Task Submission Project

Built using modern full-stack development practices with React, Node.js, PostgreSQL, Sequelize, Docker, and TypeScript.