import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import moment from "moment-timezone";

const CategoryScheme = new mongoose.Schema(
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
CategoryScheme.pre("save", async function (next) {
  if (this.isNew) {
    this._id = parseInt(customAlphabet("1234567890", 4)());
    this.createdAt = moment.tz("Asia/Ulaanbaatar").format();
  }
  next();
});

export const Category = mongoose.model("category", CategoryScheme);
