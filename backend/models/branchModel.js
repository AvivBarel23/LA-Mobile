import mongoose from 'mongoose';

const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hours: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Branch = mongoose.model('Branch', branchSchema);

export default Branch;
