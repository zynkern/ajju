import { products } from '../data.js';

export const getAllProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};
