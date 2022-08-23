import { isAdmin, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import { findOne, save } from '../persist.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';

import express from 'express';

const cartRouter = express.Router();

cartRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await findOne(User, { _id: req.query.userId });
    const cart = await findOne(Cart, { userId: req.query.userId });
    if (user) {
      if (cart) {
        res.send(cart);
        return;
      } else {
        const cartDoc = new Cart({
          userId: user._id,
          cart: {
            shippingAddress: {},
            paymentMethod: '',
            cartItems: [],
          },
          wasFetchedFromDb: false,
        });
        await save(cartDoc);
        res.send({ message: 'user cart' });
        return;
      }
    }

    res.status(401).send({ message: 'Invalid username or password' });
  })
);
cartRouter.get(
  '/admin/cartItems',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const cart = await findOne(Cart, { userId: req.query.userId });
    const cartItems = cart?.cart.cartItems;
    if (cartItems) {
      res.send(cartItems);
    } else {
      res.send([]);
    }
    res.status(401).send({ message: 'user cart doesnt exists' });
  })
);
cartRouter.put(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await findOne(User, { _id: req.body.userId });
    const cart = await findOne(Cart, { userId: req.body.userId });
    if (user) {
      if (cart) {
        cart.cart = req.body.cart;
        await save(cart);
        res.send({ message: 'cart was saved' });
        return;
      } else {
        const cartDoc = new Cart({ userId: user._id, cart: req.body.cart });
        await save(cartDoc);
        res.send({ message: 'cart was saved' });
        return;
      }
    }

    res.status(401).send({ message: 'Invalid username or password' });
  })
);

export default cartRouter;
