# E-Commerce Product Catalog

A scalable, production-ready e-commerce product catalog application built with React.js frontend and Node.js/Express backend with MySQL database.

## 📋 Features

### Backend (Node.js + Express)
- ✅ RESTful API with complete CRUD operations
- ✅ MySQL database with Sequelize ORM
- ✅ Advanced search and filtering capabilities
- ✅ Backend pagination and optimized indexing
- ✅ Modular service architecture
- ✅ Data validation and sanitization
- ✅ Rate limiting and security middleware (helmet, CORS)
- ✅ Error handling and logging
- ✅ Category-based data modeling

### Frontend (React.js)
- ✅ Advanced product search functionality
- ✅ Multi-filter support (category, price range, stock status)
- ✅ Client-side pagination
- ✅ Responsive grid layout
- ✅ Sorting options (newest, price, name)
- ✅ Loading states and error handling
- ✅ Modern, accessible UI with Tailwind-inspired design
- ✅ API-driven architecture

## 🏗️ Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Database connection config
│   │   ├── controllers/
│   │   │   ├── productController.js  # Product CRUD handlers
│   │   │   └── categoryController.js # Category handlers
│   │   ├── models/
│   │   │   ├── product.js            # Product Sequelize model
│   │   │   └── category.js           # Category Sequelize model
│   │   ├── routes/
│   │   │   ├── products.js           # Product API routes
│   │   │   └── categories.js         # Category API routes
│   │   ├── services/
│   │   │   └── productService.js     # Business logic layer
│   │   ├── middleware/
│   │   │   ├── errorHandler.js       # Global error handler
│   │   │   └── sanitize.js           # Input sanitization
│   │   ├── validators/
│   │   │   ├── productValidator.js   # Product validation schemas
│   │   │   └── categoryValidator.js  # Category validation schemas
│   │   ├── database/
│   │   │   └── migrate.js            # Database initialization
│   │   └── server.js                 # Express app entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProductList.jsx        # Main product catalog component
    │   ├── styles/
    │   │   ├── App.css                # Global styles
    │   │   └── ProductList.css        # ProductList styles
    │   ├── api.js                     # API integration layer
    │   ├── App.jsx                    # Root component
    │   ├── main.jsx                   # Entry point
    │   └── index.html
    ├── vite.config.js
    ├── package.json
    ├── .env.example
    └── README.md
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18+
- **Database**: MySQL with Sequelize ORM
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Dev Tools**: Nodemon

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite 5+
- **Styling**: CSS3
- **HTTP Client**: Fetch API

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- MySQL Server running (default: localhost:3306)

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```
   
   Example `.env`:
   ```
   PORT=4000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=product_catalog
   DB_USER=root
   DB_PASSWORD=your_password
   ```

3. **Initialize database with sample data**
   ```bash
   npm run migrate
   ```

4. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

   Server runs on: `http://localhost:4000`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Default API base is http://localhost:4000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend runs on: `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## 🔌 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products with filters |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Query Parameters (GET /api/products)

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search in name/description |
| `categoryId` | number | Filter by category |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `inStock` | boolean | Filter by stock status |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 12) |
| `sort` | string | Sort field (createdAt, price, name) |
| `order` | string | Sort order (ASC, DESC) |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:id` | Get category by ID |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

## 📝 Request/Response Examples

### List Products with Filters

**Request:**
```bash
GET /api/products?search=wireless&categoryId=1&minPrice=50&maxPrice=200&page=1&limit=12&sort=price&order=ASC
```

**Response:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones...",
      "price": "129.99",
      "categoryId": 1,
      "Category": {
        "id": 1,
        "name": "Electronics",
        "slug": "electronics"
      },
      "tags": ["audio", "wireless"],
      "inStock": true,
      "sku": "WH-1001",
      "quantity": 50,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 12,
  "pages": 2
}
```

### Create Product

**Request:**
```bash
POST /api/products
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "categoryId": 1,
  "tags": ["tag1", "tag2"],
  "inStock": true,
  "sku": "NP-1234",
  "quantity": 100
}
```

## 🔒 Security Features

- **Input Validation**: Joi schemas for all inputs
- **XSS Prevention**: Input sanitization middleware
- **SQL Injection Prevention**: Sequelize parameterized queries
- **Rate Limiting**: 200 requests per minute per IP
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers protection
- **Password Hashing**: Ready for user authentication

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Color-coded Status**: In Stock (green), Out of Stock (red)
- **Product Cards**: Beautiful hover effects
- **Filter Panel**: Intuitive multi-filter interface
- **Pagination Controls**: Easy navigation
- **Loading State**: Spinner animation during data fetch
- **No Results State**: Helpful message when no products match filters

## 🚀 Performance Optimizations

### Backend
- Database indexing on frequently queried fields
- Query optimization with Sequelize
- Rate limiting to prevent abuse
- Connection pooling

### Frontend
- Lazy loading with React
- Optimized re-renders
- Efficient state management
- CSS optimization

## 📊 Database Schema

### Products Table
- `id` (INT, Primary Key)
- `name` (VARCHAR 255)
- `description` (TEXT)
- `price` (DECIMAL 10,2)
- `categoryId` (INT, Foreign Key)
- `tags` (JSON)
- `inStock` (BOOLEAN)
- `sku` (VARCHAR 100, Unique)
- `quantity` (INT)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Categories Table
- `id` (INT, Primary Key)
- `name` (VARCHAR 100, Unique)
- `description` (TEXT)
- `slug` (VARCHAR 100, Unique)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## 🧪 Testing the API

Use any API client (Postman, Insomnia, or curl):

```bash
# Get all products
curl http://localhost:4000/api/products

# Get products in Electronics category
curl "http://localhost:4000/api/products?categoryId=1"

# Search for wireless products under $200
curl "http://localhost:4000/api/products?search=wireless&maxPrice=200"

# Create a new product
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 49.99,
    "categoryId": 1,
    "inStock": true
  }'
```

## 📚 Documentation

- Backend routes are documented with JSDoc comments
- API response format is consistent across all endpoints
- Error messages provide clear feedback
- Frontend components include inline documentation

## 🔄 Data Flow

1. **Frontend**: User interacts with ProductList component
2. **Filter/Search**: Filters are updated in component state
3. **API Call**: Frontend calls `fetchProducts()` with filters
4. **Backend Processing**:
   - Request validation
   - Input sanitization
   - Database query with filters
   - Pagination calculation
   - Response formatting
5. **Frontend Display**: Products rendered in grid with pagination
6. **User Interaction**: Update filters → repeat from step 2

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check credentials in `.env`
- Verify database exists: `product_catalog`

### CORS Errors
- Check frontend URL in backend CORS config
- Ensure API proxy is configured in vite.config.js

### Port Already in Use
```bash
# Kill process on port 4000 (backend)
# Windows: netstat -ano | findstr :4000 | taskkill /PID <PID> /F
# Linux/Mac: lsof -ti:4000 | xargs kill -9
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for frontend errors
4. Check server logs for backend errors

---

**Built with ❤️ for modern e-commerce applications**
