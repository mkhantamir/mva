import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import moment from "moment-timezone";

const ShareScheme = new mongoose.Schema(
  {
    label: String,
    image: String,

    _id: Number,
    createdAt: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ShareScheme.pre("save", async function (next) {
  if (this.isNew) {
    this._id = parseInt(customAlphabet("1234567890", 10)());
    this.createdAt = moment.tz("Asia/Ulaanbaatar").format();
  }
  next();
});

export const Share = mongoose.model("share", ShareScheme);
