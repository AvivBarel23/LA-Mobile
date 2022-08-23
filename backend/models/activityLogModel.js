import mongoose from 'mongoose';

const activityLogSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    logs: {
      type: [Object],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
