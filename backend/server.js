const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/spiritualStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Sample route
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
