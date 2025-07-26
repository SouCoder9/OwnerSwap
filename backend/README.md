# College Marketplace Backend API

A robust Node.js/Express.js backend API for a college marketplace where students can buy and sell used products.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure cookie storage
- **Product Management**: Full CRUD operations for product listings
- **Image Upload**: Cloudinary integration for image storage and optimization
- **Search & Filter**: Advanced search and filtering capabilities
- **Security**: Password hashing, input validation, and authorization middleware
- **Error Handling**: Comprehensive error handling and validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd OwnerSwap/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. **Set up MongoDB**
   - **Option 1: Local MongoDB**
     ```bash
     # Ubuntu/Debian
     sudo apt update
     sudo apt install mongodb
     sudo systemctl start mongodb
     sudo systemctl enable mongodb
     ```
   
   - **Option 2: MongoDB Atlas** (Recommended)
     - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
     - Create a cluster and get connection string
     - Update `MONGODB_URI` in `.env`

5. **Set up Cloudinary**
   - Create account at [Cloudinary](https://cloudinary.com/)
   - Get your cloud name, API key, and API secret
   - Update Cloudinary credentials in `.env`

## 🏃‍♂️ Running the Application

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@college.edu",
  "password": "password123",
  "contactNumber": "+1234567890"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@college.edu",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Cookie: token=<jwt_token>
```

#### Logout User
```http
POST /api/auth/logout
Cookie: token=<jwt_token>
```

### Product Endpoints

#### Create Product
```http
POST /api/products
Content-Type: multipart/form-data
Cookie: token=<jwt_token>

Form Data:
- title: "MacBook Pro 2021"
- description: "Excellent condition laptop"
- price: 1200
- category: "Electronics"
- contactInfo: "john@college.edu"
- images: [file1.jpg, file2.jpg]
```

#### Get All Products
```http
GET /api/products?search=macbook&category=Electronics&minPrice=500&maxPrice=2000
```

#### Get User's Products
```http
GET /api/products/my-products
Cookie: token=<jwt_token>
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Update Product
```http
PUT /api/products/:id
Content-Type: multipart/form-data
Cookie: token=<jwt_token>

Form Data:
- title: "Updated Title"
- price: 1100
- images: [newfile.jpg]
```

#### Delete Product
```http
DELETE /api/products/:id
Cookie: token=<jwt_token>
```

#### Mark Product as Sold
```http
PATCH /api/products/:id/mark-sold
Cookie: token=<jwt_token>
```

### Utility Endpoints

#### Health Check
```http
GET /api/health
```

#### API Info
```http
GET /
```

## 🗂️ Project Structure

```
backend/
├── config/
│   └── cloudinary.js       # Cloudinary configuration
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/
│   ├── User.js             # User model schema
│   └── Product.js          # Product model schema
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── productRoutes.js    # Product routes
├── .env                    # Environment variables
├── .env.example            # Environment template
├── package.json            # Dependencies and scripts
├── server.js              # Main server file
└── README.md              # This file
```

## 📝 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)
- `npm run lint` - Run ESLint (when configured)

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port | No (default: 5000) |
| `FRONTEND_URL` | Frontend URL for CORS | No (default: localhost:3000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT secret key | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

## 🚦 Testing

To test the API endpoints without a frontend:

1. **Using curl**:
   ```bash
   # Test health endpoint
   curl http://localhost:5000/api/health
   
   # Register a user
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
   ```

2. **Using Postman or Thunder Client**: Import the endpoints and test manually

3. **Using the test script**:
   ```bash
   node test-api.js
   ```

## 🔒 Security Features

- Password hashing with bcryptjs (12 salt rounds)
- JWT authentication with httpOnly cookies
- Input validation with express-validator
- Authorization middleware for protected routes
- CORS configuration
- File upload restrictions and validation
- MongoDB injection protection

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or Atlas URI is correct
   - Check firewall settings and network connectivity

2. **Cloudinary Upload Issues**
   - Verify Cloudinary credentials in `.env`
   - Check file size limits (5MB max)
   - Ensure supported file formats (jpg, jpeg, png, webp, gif)

3. **JWT Token Issues**
   - Verify JWT_SECRET is set in `.env`
   - Check cookie settings in browser (httpOnly, secure flags)

4. **CORS Issues**
   - Update FRONTEND_URL in `.env`
   - Check credentials: true setting
## 📄 License

This project is licensed under the MIT License.
