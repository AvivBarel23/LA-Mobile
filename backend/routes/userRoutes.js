import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { isAuth, isAdmin, generateToken } from '../utils.js';
import {
  getAll,
  activityLogUpdate,
  findById,
  findOne,
  save,
} from '../persist.js';
import ActivityLog from '../models/activityLogModel.js';

const userRouter = express.Router();

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await getAll(User);
    res.send(users);
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await findOne(User, { username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        await activityLogUpdate('sign in', user._id);
        res.send({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid username or password' });
  })
);
userRouter.post(
  '/signout',
  expressAsyncHandler(async (req, res) => {
    const user = await findOne(User, { _id: req.body.userId });
    if (user) {
      await activityLogUpdate('sign out', user._id);
      res.send({ message: 'sign out' });
      return;
    }
    res.status(401).send({ message: 'Invalid username or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await save(newUser);
    await activityLogUpdate('sign up', user._id);
    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await findById(User, req.user._id);
    if (user) {
      user.username = req.body.name || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await save(user);
      await activityLogUpdate('change password', user._id);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User was not found' });
    }
  })
);

userRouter.get(
  '/admin/activityLogs',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await findOne(ActivityLog, { userId: req.query.id });
    if (user) {
      res.send(user.logs);
      return;
    }
    res.status(401).send({ message: 'Invalid username or password' });
  })
);

export default userRouter;
