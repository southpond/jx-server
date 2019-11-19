import mongoose from "mongoose";
import activityData from "../../initData/activity";

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  index: { type: String, index: true },
  description: String,
  icon_color: String,
  id: Number,
  name: String,
  ranking_weight: Number
});

const Activity = mongoose.model("Activity", activitySchema);

Activity.findOne((err, data) => {
  if (!data) {
    activityData.forEach(item => {
      Activity.create(item);
    });
  }
});

export default Activity;
