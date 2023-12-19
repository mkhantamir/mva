import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import moment from "moment-timezone";

const TeamScheme = new mongoose.Schema(
  {
    name: String,
    name_eng: String,
    shortname: String,
    logo: String,
    type: {
      type: String,
      enum: ["male", "female"],
    },

    _id: Number,
    createdAt: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
TeamScheme.pre("save", async function (next) {
  if (this.isNew) {
    this._id = parseInt(customAlphabet("1234567890", 8)());
    this.createdAt = moment.tz("Asia/Ulaanbaatar").format();
  }
  next();
});
TeamScheme.virtual("user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});

export const Team = mongoose.model("team", TeamScheme);
