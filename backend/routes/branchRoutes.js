import express from 'express';
import data from '../data.js';
import { insertMany } from '../persist.js';
import expressAsyncHandler from 'express-async-handler';
import Branch from '../models/branchModel.js';

const branchRouter = express.Router();
const { branches } = data;

branchRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    res.send(await getAll(Branch));
  })
);

branchRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    await insertMany(Branch, branches);
  })
);
export default branchRouter;
