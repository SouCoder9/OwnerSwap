# OwnerSwap: The College Marketplace

A full-stack web application where college students can buy and sell used products. The project consists of a robust **Node.js/Express.js backend API** and a modern **React/Vite/Tailwind CSS frontend**.

## 🚀 Key Features

| Feature Area | Backend (Node/Express) | Frontend (React/Vite) |
| :--- | :--- | :--- |
| **User Management** | JWT Auth, secure cookies, bcrypt hashing, protected routes. | Register, Login, Logout flow with **Context API** state. |
| **Product Listings** | Full **CRUD** operations, Cloudinary image upload, authorization. | Create, edit, delete, **Mark as Sold**, My Products dashboard. |
| **Search & Filter** | Advanced query parameters for search, category, and price range. | Responsive filtering component with instant results. |
| **Security** | Input validation (`express-validator`), MongoDB injection protection. | **PrivateRoute** protection, client-side validation. |
| **Design** | N/A | **Mobile-first responsive design** with **Tailwind CSS**. |

## 🎯 Current Status: Full Marketplace Complete! 🎉

All core features, including full **CRUD** for products, **secure authentication**, advanced searching, and a responsive UI, are complete.

## 🛠️ Installation & Setup

You will need **Node.js (v16+), MongoDB, and a Cloudinary account** to run the full application.

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/SouCoder9/OwnerSwap.git 
cd OwnerSwap

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the **`backend`** directory based on the `.env.example` and fill in your credentials:

| Variable | Description |
| :--- | :--- |
| `MONGODB_URI` | Your MongoDB connection string (Atlas recommended) |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary Cloud Name |
| `CLOUDINARY_API_KEY` / `SECRET` | Your Cloudinary API Key and Secret |

### 3. Start the Servers

You will need **two separate terminals** to run both the backend and frontend concurrently.

#### Start Backend API

```bash
# In the /OwnerSwap/backend directory
npm run dev
# Server runs on http://localhost:5000
```

#### Start Frontend Application

```bash
# In the /OwnerSwap/frontend directory
npm run dev
# App runs on http://localhost:5173
```

## 📚 API Endpoints Overview (Backend)

| Category | Method | Endpoint | Description | Authentication |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Create a new user account. | Public |
| **Auth** | `POST` | `/api/auth/login` | Log in and receive an `httpOnly` JWT cookie. | Public |
| **Auth** | `GET` | `/api/auth/me` | Get the currently logged-in user's profile. | Protected |
| **Product** | `POST` | `/api/products` | Create a new product listing (supports `multipart/form-data`). | Protected |
| **Product** | `GET` | `/api/products` | Get all products with search and filter support (e.g., `?search=book&category=Textbooks`). | Public |
| **Product** | `GET` | `/api/products/my-products` | Get the logged-in user's listings. | Protected |
| **Product** | `PUT` | `/api/products/:id` | Update a product listing. | Protected (Owner only) |
| **Product** | `DELETE` | `/api/products/:id` | Delete a product listing. | Protected (Owner only) |

## 🗂️ Project Structure

```
OwnerSwap/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # Express API endpoints
│   ├── middleware/       # Auth/Error handling
│   └── server.js         # Main entry point
└── frontend/
   ├── src/
   │   ├── components/     # Reusable UI elements
   │   ├── context/        # Global state management
   │   ├── pages/          # Router-defined components
   │   └── services/       # API integration layer (Axios)
   └── tailwind.config.js
```

## 📄 License

This project is licensed under the **MIT License**.

-----

Let me know if you'd like to dive deeper into any specific section, like the database schema or the frontend state management!