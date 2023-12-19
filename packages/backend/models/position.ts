import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import moment from "moment-timezone";

const PositionScheme = new mongoose.Schema(
  {
    label: String,
    icon: String,

    _id: Number,
    createdAt: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
PositionScheme.pre("save", async function (next) {
  if (this.isNew) {
    this._id = parseInt(customAlphabet("1234567890", 4)());
    this.createdAt = moment.tz("Asia/Ulaanbaatar").format();
  }
  next();
});

export const Position = mongoose.model("position", PositionScheme);
