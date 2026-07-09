# 🚀 Quick Start Guide

Get your E-Commerce Product Catalog up and running in 5 minutes!

## Prerequisites
- ✅ Node.js 16+ installed
- ✅ npm installed  
- ✅ MySQL Server installed and running

## Step-by-Step Setup

### 1️⃣ Backend Setup (2 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your MySQL credentials (optional, defaults work for local dev)
# DB_HOST=localhost
# DB_PORT=3306
# DB_NAME=product_catalog
# DB_USER=root
# DB_PASSWORD=password

# Initialize database with sample data
npm run migrate

# Start the server
npm run dev
```

✅ Backend running at: http://localhost:4000

### 2️⃣ Frontend Setup (2 minutes)

**In a new terminal:**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment template (optional, defaults work)
cp .env.example .env

# Start the development server
npm run dev
```

✅ Frontend running at: http://localhost:5173

---

## 🎉 You're Done!

The Product Catalog should now be open in your browser at http://localhost:5173

## 🔍 What You Can Do

### Search & Filter
- 📍 Search by product name or description
- 📂 Filter by category
- 💵 Filter by price range
- 📦 Filter by stock status
- 🔤 Sort by newest, price, or name

### Try These Examples
1. Search for "wireless" → find wireless headphones
2. Filter by "Electronics" category
3. Set max price to $50 → budget items
4. Sort by price ascending → cheapest first

## 📊 Sample Data Included

The database is pre-populated with:
- ✅ 5 Categories (Electronics, Clothing, Books, Home & Garden, Sports)
- ✅ 10 Sample Products with full details
- ✅ Different stock statuses and prices

## 🛠️ Useful Commands

### Backend
```bash
npm run dev      # Development mode (with auto-reload)
npm start        # Production mode
npm run migrate  # Re-initialize database
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔌 API Quick Reference

### Get All Products
```bash
curl http://localhost:4000/api/products
```

### Search Products
```bash
curl "http://localhost:4000/api/products?search=wireless"
```

### Filter by Category & Price
```bash
curl "http://localhost:4000/api/products?categoryId=1&minPrice=50&maxPrice=200"
```

### Get Categories
```bash
curl http://localhost:4000/api/categories
```

## 📝 Environment Files

### Backend `.env`
```
PORT=4000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=product_catalog
DB_USER=root
DB_PASSWORD=password
```

### Frontend `.env`
```
VITE_API_BASE=http://localhost:4000
```

## 🆘 Troubleshooting

### "Cannot find module 'sequelize'"
```bash
cd backend && npm install
```

### "MySQL Connection Error"
- Ensure MySQL is running
- Check credentials in `.env`
- Database will be created automatically

### "Port 4000 already in use"
```bash
# Linux/Mac
lsof -ti:4000 | xargs kill -9

# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### "Frontend can't connect to backend"
- Ensure backend is running on http://localhost:4000
- Check VITE_API_BASE in frontend `.env`
- Clear browser cache

## 🎓 Project Structure

```
project/
├── backend/          ← Node.js/Express API
│   └── src/
│       ├── models/   ← Database models
│       ├── routes/   ← API endpoints
│       ├── services/ ← Business logic
│       └── server.js ← Entry point
│
└── frontend/         ← React UI
    └── src/
        ├── components/ ← React components
        ├── styles/     ← CSS files
        └── api.js      ← API integration
```

## 🎨 Frontend Features

✨ **Modern UI**
- Responsive grid layout
- Beautiful product cards
- Smooth animations
- Color-coded status badges

🔎 **Advanced Filtering**
- Multi-filter support
- Real-time search
- Price range slider
- Category selector
- Stock status filter

📱 **Mobile Friendly**
- Works on all devices
- Touch-friendly buttons
- Responsive design

## 🔒 Security Features

- ✅ Input validation with Joi
- ✅ XSS attack prevention
- ✅ Rate limiting (200 req/min)
- ✅ CORS protection
- ✅ SQL injection prevention (Sequelize)

## 📊 Database Features

- ✅ Optimized indexes for search
- ✅ Pagination support
- ✅ Price range filtering
- ✅ Category relationships
- ✅ Stock tracking

## 🚀 Next Steps

1. **Explore the UI** - Play with filters and search
2. **Review API** - Check the comprehensive API documentation in README.md
3. **Customize** - Modify styles or add more products
4. **Deploy** - Build for production with `npm run build`

## 📖 Full Documentation

For detailed documentation, see [README.md](../README.md) in the project root.

## 🎯 Key Features Implemented

✅ Product listing with advanced search
✅ Category-based filtering  
✅ Price range filtering
✅ Stock status filtering
✅ Backend pagination
✅ Database indexing
✅ RESTful API design
✅ Data validation & sanitization
✅ Modular architecture
✅ Professional UI design
✅ Mobile responsive
✅ Error handling

---

**Happy coding! 🎉**

If you have any questions or issues, check the Troubleshooting section or review the full README.md documentation.
