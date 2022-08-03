import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import seedRouter from  "./routes/seedRoutes.js";

dotenv.config();
connectDatabase();
const app = express();

app.use('/api/seed',seedRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server running on port ${PORT}...`));
