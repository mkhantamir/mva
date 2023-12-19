import {
  Team,
  asyncHandler,
  customError,
  message,
  objectCleaner,
  paginate,
} from "@mva/backend";

export const addTeam = asyncHandler(async (req, res) => {
  const data = objectCleaner(req.body, [
    "name",
    "name_eng",
    "shortname",
    "logo",
    "type",
  ]);
  await Team.create(data);

  res.status(200).json({
    success: true,
    message: message.added,
  });
});
export const changeTeamInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = objectCleaner(req.body, [
    "name",
    "name_eng",
    "shortname",
    "logo",
    "type",
  ]);
  const team = await Team.findByIdAndUpdate(id, data, { new: true });
  if (!team) {
    throw new customError(message.not_found, 404);
  }

  res.status(200).json({
    success: true,
    message: message.updated,
  });
});
export const deleteTeam = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const team = await Team.findByIdAndDelete(id);
  if (!team) {
    throw new customError(message.not_found, 404);
  }
  res.status(200).json({
    success: true,
    message: message.deleted,
  });
});

// ---------- USER ----------

export const getTeams = asyncHandler(async (req, res) => {
  const select: string = req.query.select as any;
  const sort: string = (req.query.sort as any) || "-createdAt";
  const per_page: number = parseInt(req.query.per_page + "") || 15;
  const page: number = parseInt(req.query.page + "") || 1;

  ["select", "sort", "per_page", "page"].forEach((el) => delete req.query[el]);

  const count: number = await Team.countDocuments();
  const pagination = paginate(page, per_page, count);

  const team = await Team.find()
    .select(select)
    .sort(sort)
    .skip(pagination.start_index - 1)
    .limit(per_page);

  res.status(200).json({
    success: true,
    result: team,
    count: count,
    pagination,
  });
});

export const getTeam = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const team = await Team.findById(id);
  if (!team) {
    throw new customError(message.not_found, 404);
  }

  res.status(200).json({
    success: true,
    result: team,
  });
});
