import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import ActivityLog from './models/activityLogModel.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const save = async (obj) => {
  return obj.save();
};

export const find = async (table, query) => {
  let results = {};
  if (table === 'User') {
    results = await User.find(query);
  }
  if (table === 'Order') {
    results = await Order.find(query);
  }
  if (table === 'Product') {
    results = await Product.find(query);
  }
  return results;
};

export const getAll = async (table) => {
  return table.find();
};
export const findOne = async (table, query) => {
  return table.findOne(query);
};

export const findById = async (table, indicator) => {
  return table.findById(indicator);
};

export const countDocuments = async (table, filter) => {
  return table.countDocuments(filter);
};
export const insertMany = async (table, obj) => {
  return table.insertMany(obj);
};
export const presentProducts = async (
  filterObj,
  sortOrder,
  skipSize,
  limitSize
) => {
  return Product.find(filterObj)
    .sort(sortOrder)
    .skip(skipSize)
    .limit(limitSize);
};

export const activityLogUpdate = async (type, userId) => {
  const now = new Date();
  const date = {
    type: type,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
  };
  const user = await findOne(ActivityLog, { userId: userId });
  if (user) {
    user.logs.push(date);
    await save(user);
  } else {
    const activityUpdate = new ActivityLog({
      userId: userId,
      logs: [date],
    });
    await save(activityUpdate);
  }
};

export const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const generatedFilename = uuidv4();
    cb(null, `${generatedFilename}.${ext}`);
  },
});

export const upload = multer({
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
