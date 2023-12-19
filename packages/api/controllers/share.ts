import { Share, asyncHandler } from "@mva/backend";
import axios from "axios";

export const checkShare = asyncHandler(async (req, res) => {
  const label = req.body.label;
  const share = await Share.findOne({ label });

  res.status(200).json({
    success: true,
    result: share ? true : false,
  });
});
const uploadFile = async (base64, name) => {
  const uri = base64.split(";base64,").pop();
  const imgBuffer = Buffer.from(uri, "base64");
  const ACCESS_KEY = "60e46042-23ae-4b8d-98ca48e93fdc-52db-49f1";
  await axios.put(
    `https://storage.bunnycdn.com/mesa/volleyball/2023/share/${name}.jpeg`,
    imgBuffer,
    {
      headers: {
        AccessKey: ACCESS_KEY,
        "Content-Type": "application/octet-stream",
      },
    }
  );
  return true;
};
export const uploadShare = asyncHandler(async (req, res) => {
  const label = req.body.label;
  const image = req.body.image;
  await uploadFile(image, label);
  await Share.create({ label });

  res.status(200).json({
    success: true,
  });
});
