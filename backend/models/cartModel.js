import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cart: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
