import { Player, User, Vote, asyncHandler, customError } from "@mva/backend";

export const createVote = asyncHandler(async (req, res) => {
  const user_id = 0;
  const players = req.body.players;
  const gender = req.body.gender;
  // const user = await User.findById(user_id).select("is_voted");
  // if (!user) {
  //   throw new customError("Хэрэглэгч олдсонгүй!", 404);
  // }
  // if (gender === "male" && user.is_voted_male) {
  //   throw new customError("Нэг хаягаас нэг л санал өгөх боломжтой!", 401);
  // }
  // if (gender === "female" && user.is_voted_female) {
  //   throw new customError("Нэг хаягаас нэг л санал өгөх боломжтой!", 401);
  // }
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
const getPlayersSortByVote = async (
  position: number,
  gender: "male" | "female"
) => {
  const results = await Vote.aggregate([
    {
      $lookup: {
        from: "players",
        localField: "player_id",
        foreignField: "_id",
        as: "player",
      },
    },
    {
      $match: {
        position_id: position,
        "player.sex": gender,
      },
    },
    {
      $group: {
        _id: "$player_id",
        totalVotes: { $sum: 1 },
      },
    },
    {
      $sort: { totalVotes: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  const players = await Promise.all(
    results.map(async (item) => {
      const player = await Player.findById(item._id)
        .select(
          "firstname lastname firstname_eng lastname_eng number avatar team_id is_legioner"
        )
        .populate({ path: "team", select: "name" });

      return { player, position, totalVotes: item.totalVotes };
    })
  );

  return players;
};

export const getPlayersByVote = asyncHandler(async (req, res) => {
  const males = [];
  const females = [];
  await Promise.all(
    [...Array(7)].map(async (a, i) => {
      const player = await getPlayersSortByVote(i, "male");
      males.push(...player);
    })
  );
  await Promise.all(
    [...Array(7)].map(async (a, i) => {
      const player = await getPlayersSortByVote(i, "female");
      females.push(...player);
    })
  );

  res.status(200).json({
    success: true,
    result: {
      male: males,
      female: females,
    },
  });
});
export const getVoteCount = asyncHandler(async (req, res) => {
  const count = await Vote.aggregate([
    {
      $lookup: {
        from: "players",
        localField: "player_id",
        foreignField: "_id",
        as: "player",
      },
    },
    {
      $group: {
        _id: "$player.sex",
        votes: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    result: {
      all: ((count[0].votes + count[1].votes) / 7).toFixed(),
      male: (count.find((a) => a._id[0] === "male").votes / 7).toFixed(),
      female: (count.find((a) => a._id[0] === "female").votes / 7).toFixed(),
    },
  });
});
