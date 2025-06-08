const express = require('express');
const router = express.Router();

// In-memory product list (temporary)
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 1500,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Notebook',
    description: 'College-ruled notebook',
    price: 2,
    category: 'stationery',
    inStock: true
  },
  {
    id: '3',
    name: 'Headphones',
    description: 'Wireless Bluetooth headphones',
    price: 200,
    category: 'electronics',
    inStock: false
  }
];

// GET /api/products - List with filter & pagination
router.get('/', (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  let filtered = products;

  // Filter by category
  if (category) {
    filtered = filtered.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Pagination logic
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);

  const paginated = filtered.slice(start, end);

  res.json({
    page: parseInt(page),
    limit: parseInt(limit),
    total: filtered.length,
    products: paginated
  });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST /api/products
router.post('/', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: (products.length + 1).toString(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  products[index] = {
    id: req.params.id,
    name,
    description,
    price,
    category,
    inStock
  };

  res.json(products[index]);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json({ message: 'Deleted successfully', deleted });
});

// GET /api/products/search?name=term
router.get('/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'Name query is required' });

  const results = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json({ results });
});

// GET /api/products/stats
router.get('/stats', (req, res) => {
  const stats = {};

  for (const product of products) {
    const cat = product.category.toLowerCase();
    stats[cat] = (stats[cat] || 0) + 1;
  }

  res.json({
    totalProducts: products.length,
    countByCategory: stats
  });
});

module.exports = router;
