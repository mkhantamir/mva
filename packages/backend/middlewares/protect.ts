import jwt from "jsonwebtoken";
import { User, customError, JWT_SECRET } from "..";
import { asyncHandler } from "./asyncHandler";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new customError("Нэвтрэх мэдээлэл олдсонгүй!", 401);
  }

  const { id }: any = jwt.verify(token, JWT_SECRET);
  if (!id) {
    throw new customError("Нэвтрэх мэдээлэл олдсонгүй!", 401);
  }
  const user = await User.findById(id);
  if (!user) {
    throw new customError("Бүртгэл олдсонгүй!", 401);
  }

  console.log(user.role);

  req.query._id = user._id + "";
  req.query.role = user.role + "";

  next();
});
export const removeId = asyncHandler(async (req, res, next) => {
  req.query._id = undefined;
  req.query.role = undefined;

  next();
});
