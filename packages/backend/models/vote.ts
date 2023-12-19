import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import moment from "moment-timezone";

const VoteScheme = new mongoose.Schema(
  {
    player_id: Number,
    user_id: Number,
    position_id: Number,

    _id: Number,
    createdAt: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
VoteScheme.pre("save", async function (next) {
  if (this.isNew) {
    this._id = parseInt(customAlphabet("1234567890", 8)());
    this.createdAt = moment.tz("Asia/Ulaanbaatar").format();
  }
  next();
});
VoteScheme.virtual("user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});
VoteScheme.virtual("player", {
  ref: "player",
  localField: "player_id",
  foreignField: "_id",
  justOne: true,
});

export const Vote = mongoose.model("vote", VoteScheme);
