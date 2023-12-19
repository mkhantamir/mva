import {
  Player,
  asyncHandler,
  customError,
  message,
  objectCleaner,
  paginate,
} from "@mva/backend";

export const addPlayer = asyncHandler(async (req, res) => {
  const data = objectCleaner(req.body, [
    "firstname",
    "lastname",
    "firstname_eng",
    "lastname_eng",
    "number",
    "avatar",
    "age",
    "sex",
    "position_id",
    "category_id",
    "team_id",
    "is_legioner",
  ]);
  await Player.create(data);

  res.status(200).json({
    success: true,
    message: message.added,
  });
});
export const changePlayerInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = objectCleaner(req.body, [
    "firstname",
    "lastname",
    "firstname_eng",
    "lastname_eng",
    "number",
    "avatar",
    "age",
    "sex",
    "position_id",
    "category_id",
  ]);
  const player = await Player.findByIdAndUpdate(id, data, { new: true });
  if (!player) {
    throw new customError(message.not_found, 404);
  }

  res.status(200).json({
    success: true,
    message: message.updated,
  });
});
export const deletePlayer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const player = await Player.findByIdAndDelete(id);
  if (!player) {
    throw new customError(message.not_found, 404);
  }
  res.status(200).json({
    success: true,
    message: message.deleted,
  });
});

// ---------- USER ----------

export const getPlayers = asyncHandler(async (req, res) => {
  const select: string = req.query.select as any;
  const sort: string = (req.query.sort as any) || "-createdAt";
  const per_page: number = parseInt(req.query.per_page + "") || 15;
  const page: number = parseInt(req.query.page + "") || 1;

  ["select", "sort", "per_page", "page"].forEach((el) => delete req.query[el]);

  const count: number = await Player.countDocuments();
  const pagination = paginate(page, per_page, count);

  const player = await Player.find()
    .select(select)
    .sort(sort)
    .skip(pagination.start_index - 1)
    .limit(per_page)
    .populate({ path: "team", select: "name name_eng shortname" })
    .populate({ path: "position", select: "icon" });

  res.status(200).json({
    success: true,
    result: player,
    count: count,
    pagination,
  });
});

export const getPlayer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const player = await Player.findById(id);
  if (!player) {
    throw new customError(message.not_found, 404);
  }

  res.status(200).json({
    success: true,
    result: player,
  });
});
