import * as mongoose from "mongoose";
import { model } from "mongoose";

const bannerSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
    default: "active",
  },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("banners", bannerSchema);
