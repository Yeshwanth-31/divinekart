const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Image upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Create product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, category, material, price } = req.body;
    const imageUrl = req.file?.path;
    const newProduct = new Product({ name, category, material, price, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Get products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Delete product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
