import { User, asyncHandler, customError } from "@mva/backend";

export const checkVoted = asyncHandler(async (req, res) => {
  const id = req.query._id;
  const user = await User.findById(id);
  if (!user) {
    throw new customError("Хэрэглэгч олдсонгүй!", 404);
  }
  res.status(200).json({
    success: true,
    result: {
      male: user.is_voted_male,
      female: user.is_voted_female,
    },
  });
});
