import { User, Vote, asyncHandler, customError } from "@mva/backend";

export const createVote = asyncHandler(async (req, res) => {
  const user_id = req.query._id;
  const players = req.body.players;
  const gender = req.body.gender;
  const user = await User.findById(user_id).select("is_voted");
  if (!user) {
    throw new customError("Хэрэглэгч олдсонгүй!", 404);
  }
  if (gender === "male" && user.is_voted_male) {
    throw new customError("Нэг дугаараас нэг л санал өгөх боломжтой!", 401);
  }
  if (gender === "female" && user.is_voted_female) {
    throw new customError("Нэг дугаараас нэг л санал өгөх боломжтой!", 401);
  }
  await Promise.all(
    players.map(async (player) => {
      await Vote.create({ user_id, ...player });
    })
  );

  gender === "male" &&
    (await User.findByIdAndUpdate(user_id, { is_voted_male: true }));
  gender === "female" &&
    (await User.findByIdAndUpdate(user_id, { is_voted_female: true }));

  res.status(200).json({
    success: true,
  });
});
export const getOwnVote = asyncHandler(async (req, res) => {
  const user_id = req.query._id;
  const votes = await Vote.find({ user_id }).populate({
    path: "player",
    select: "team_id number sex",
    populate: { path: "team", select: "shortname" },
  });
  res.status(200).json({
    success: true,
    result: votes,
  });
});
