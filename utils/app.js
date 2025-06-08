const express = require('express');
const app = express();
const productRoutes = require('./routes/products');

// Middleware
app.use(express.json()); // for parsing JSON

// Routes
app.use('/api/products', productRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
