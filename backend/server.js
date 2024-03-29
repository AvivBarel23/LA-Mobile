import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/MongoDb.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import branchRouter from './routes/branchRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import cartRouter from './routes/cartRoutes.js';

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/upload', uploadRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/branches', branchRouter);
app.use('/api/cart', cartRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server running on port ${PORT}...`));
