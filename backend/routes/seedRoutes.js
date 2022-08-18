import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { insertMany } from '../persist.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  let createdProducts = {};
  let createdUsers = {};
  try {
    await Product.remove({});
    createdProducts = await insertMany(Product, data.products);
  } catch {}
  try {
    await User.remove({});
    createdUsers = await insertMany(User, data.users);
  } catch {}

  res.send({ createdProducts, createdUsers });
});

export default seedRouter;
