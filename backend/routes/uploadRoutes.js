import express from 'express';
import multer from 'multer';
import { isAdmin, isAuth } from '../utils.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const uploadRouter = express.Router();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const generatedFilename = uuidv4();
    cb(null, `${generatedFilename}.${ext}`);
  },
});
const upload = multer({
  storage: multerStorage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

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
