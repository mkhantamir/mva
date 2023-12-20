import {
  JWT_SECRET,
  User,
  asyncHandler,
  customError,
  message,
  objectCleaner,
} from "@mva/backend";
import firebase from "firebase-admin";
import jwt from "jsonwebtoken";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyB_XzHuoMbsExM93vh_mk2ZCXloxiKZZx8",
  authDomain: "mva-vote.firebaseapp.com",
  projectId: "mva-vote",
  storageBucket: "mva-vote.appspot.com",
  messagingSenderId: "1133071656",
  appId: "1:1133071656:web:852be8cba0dd535053941d",
};
firebase.initializeApp(firebaseConfig);

const register = async (fb_id: string, data: { [key: string]: any }) => {
  const user = await User.create({ ...data, fb_id, role: "client" });
  return user;
};

export const login = asyncHandler(async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    const data = objectCleaner(req.body, ["ip", "uuid", "email"]);
    const response = (
      await axios.get(
        `https://graph.facebook.com/me?access_token=${authorization}`
      )
    ).data;

    let user: any = await User.findOne({ fb_id: response.id });
    if (!user) {
      user = await register(response.id, data);
    }
    const token = user.getJsonWebToken();
    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    res.status(200).cookie("token", token, cookieOptions).json({
      success: true,
      message: message.logged_in,
    });
  } catch (error) {
    throw new customError(error.message, 400);
  }
});
export const logout = asyncHandler(async (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 1000),
  };
  res.status(200).cookie("token", "", cookieOptions).json({
    success: true,
    message: message.logged_out,
  });
});
export const status = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  const resultFalse = () => {
    res.status(200).json({
      success: true,
      result: false,
    });
    return null;
  };
  if (!cookie) {
    return resultFalse();
  }
  if (!cookie.token) {
    return resultFalse();
  }
  const { id }: any = jwt.verify(cookie.token, JWT_SECRET);
  if (!id) {
    return resultFalse();
  }

  const user = await User.findById(id);
  if (!user) {
    return resultFalse();
  }
  res.status(200).json({
    success: true,
    result: true,
    id: user._id,
  });
});
