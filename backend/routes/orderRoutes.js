import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
import { find, findById, save } from '../persist.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await save(newOrder);
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = find('Order', { user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await findById(Order, req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await findById(Order, req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order not found' });
    }
  })
);

export default orderRouter;
