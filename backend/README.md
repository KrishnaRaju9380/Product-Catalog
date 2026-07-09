# Product Catalog Backend

Minimal Node.js + Express backend for a product catalog using Sequelize (SQLite by default).

Quick start

1. Copy `.env.example` to `.env` (optional — SQLite is used by default).
2. Install dependencies:

```bash
cd backend
npm install
```

3. Initialize database and seed sample data:

```bash
npm run migrate
```

4. Run in development:

```bash
npm run dev
```

API endpoints

- `GET /api/products` - list with search, filtering, pagination
- `GET /api/products/:id` - get product
- `POST /api/products` - create product (validation)
- `PUT /api/products/:id` - update product
- `DELETE /api/products/:id` - delete product

Design notes

- Uses Sequelize ORM; defaults to SQLite for local development (file: `backend/data/database.sqlite`).
- Validation with `joi` and input sanitization middleware.
- Modular controllers, services and validators for maintainability.
