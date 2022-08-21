import mongoose from 'mongoose';

const activityLogSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    logs: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
