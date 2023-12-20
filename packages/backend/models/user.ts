import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import moment from "moment-timezone";
import jwt from "jsonwebtoken";
import { JWT_EXPIRESIN, JWT_SECRET } from "..";

const UserScheme = new mongoose.Schema(
  {
    email: String,
    phone: String,
    fb_id: String,
    ip: String,
    uuid: String,
    role: {
      type: String,
      enum: ["client", "admin"],
    },
    is_voted_male: {
      type: Boolean,
      default: false,
    },
    is_voted_female: {
      type: Boolean,
      default: false,
    },

    _id: Number,
    createdAt: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
UserScheme.pre("save", async function (next) {
  if (this.isNew) {
    this._id = parseInt(customAlphabet("1234567890", 12)());
    this.createdAt = moment.tz("Asia/Ulaanbaatar").format();
  }
  next();
});
UserScheme.virtual("user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});
UserScheme.methods.getJsonWebToken = function () {
  const token = jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRESIN,
  });
  return token;
};

export const User = mongoose.model("user", UserScheme);
