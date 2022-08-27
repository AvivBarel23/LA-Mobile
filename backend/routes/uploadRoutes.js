import express from 'express';
import { isAdmin, isAuth } from '../utils.js';
import { upload } from '../persist.js';
const uploadRouter = express.Router();

uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('file'),
  async (req, res) => {
    res.status(201).send({ filename: '/images/' + req.file.filename });
  }
);
export default uploadRouter;
