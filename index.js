const express = require('express');
const logger = require('./middleware/logger');
const productRoutes = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

app.use(logger);
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Global error handler (last middleware)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
