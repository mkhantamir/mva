import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import moment from "moment-timezone";

const PlayerScheme = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,

    firstname_eng: String,
    lastname_eng: String,

    number: Number,
    avatar: String,
    age: Number,
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    position_id: Number,
    category_id: Number,
    team_id: Number,
    is_legioner: Boolean,

    _id: Number,
    createdAt: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
PlayerScheme.pre("save", async function (next) {
  if (this.isNew) {
    this._id = parseInt(customAlphabet("1234567890", 8)());
    this.createdAt = moment.tz("Asia/Ulaanbaatar").format();
  }
  next();
});
PlayerScheme.virtual("team", {
  ref: "team",
  localField: "team_id",
  foreignField: "_id",
  justOne: true,
});
PlayerScheme.virtual("position", {
  ref: "position",
  localField: "position_id",
  foreignField: "_id",
  justOne: true,
});

export const Player = mongoose.model("player", PlayerScheme);
