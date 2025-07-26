# OwnerSwap Frontend

A modern React frontend for the College Marketplace application built with Vite, React Router, and Tailwind CSS.

## 🚀 Features

- **Modern React**: Built with React 18 and functional components
- **Fast Development**: Powered by Vite for lightning-fast development
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Authentication**: Complete user registration and login system
- **Routing**: Client-side routing with React Router
- **State Management**: Context API for authentication state
- **API Integration**: Axios for backend communication
- **Icons**: Beautiful icons with React Icons (Feather icons)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

## 🛠️ Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🎯 Current Status: Phase 3C Complete! 🎉

### Phase 3A Complete ✅:
- [x] Project setup with Vite and React
- [x] Tailwind CSS configuration
- [x] React Router setup
- [x] Authentication context
- [x] Layout components (Navbar, Footer)
- [x] Authentication forms (Login, Register)
- [x] Home page with hero section
- [x] API service layer
- [x] Responsive design

### Phase 3B Complete ✅:
- [x] Product listing page with grid layout
- [x] Product card component with image display
- [x] Product detail page with full information
- [x] Search and filtering functionality
- [x] Filter options component
- [x] Loading states and error handling
- [x] Responsive product grid
- [x] Category-based filtering
- [x] Price range filtering

### Phase 3C Complete ✅:
- [x] PrivateRoute component for authentication protection
- [x] ImageUpload component with drag & drop functionality
- [x] CreateProduct page with comprehensive form validation
- [x] MyProducts page for managing user listings
- [x] Product management (mark as sold, delete)
- [x] File upload with preview and validation
- [x] Statistics dashboard for user products
- [x] Complete CRUD operations for products

### 🎆 Full Marketplace Features:
- ✅ **User Authentication** - Register, login, logout, protected routes
- ✅ **Product Browsing** - View all products, search, filter by category/price
- ✅ **Product Details** - Full product information, image galleries, seller contact
- ✅ **Product Management** - Create, edit, delete, mark as sold
- ✅ **Image Upload** - Drag & drop with validation and preview
- ✅ **User Dashboard** - Manage personal product listings
- ✅ **Responsive UI** - Mobile-first design with Tailwind CSS

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 📱 Testing the Frontend

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit**: http://localhost:5173

3. **Test features**:
   - Navigate through the home page
   - Try registration form (won't work without backend)
   - Try login form (won't work without backend)
   - Check responsive design on mobile

## 🔗 Integration with Backend

To test with the full backend:

1. **Start backend server** (in separate terminal):
   ```bash
   cd ../backend
   npm run dev
   ```

2. **Start frontend server**:
   ```bash
   npm run dev
   ```

3. **Test full authentication flow**:
   - Register a new account
   - Login with credentials
   - Navigate authenticated routes

## 📄 License

This project is licensed under the MIT License.
