import {
  Position,
  asyncHandler,
  customError,
  message,
  objectCleaner,
} from "@mva/backend";

export const addPosition = asyncHandler(async (req, res) => {
  const data = objectCleaner(req.body, ["label", "icon"]);
  await Position.create(data);

  res.status(200).json({
    success: true,
    message: message.added,
  });
});
export const changePositionInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = objectCleaner(req.body, ["label"]);
  const team = await Position.findByIdAndUpdate(id, data, { new: true });
  if (!team) {
    throw new customError(message.not_found, 404);
  }

  res.status(200).json({
    success: true,
    message: message.updated,
  });
});
export const deletePosition = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const position = await Position.findByIdAndDelete(id);
  if (!position) {
    throw new customError(message.not_found, 404);
  }
  res.status(200).json({
    success: true,
    message: message.deleted,
  });
});

// ---------- USER ----------

export const getPositions = asyncHandler(async (req, res) => {
  const position = await Position.find();

  res.status(200).json({
    success: true,
    result: position,
  });
});

export const getPosition = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const position = await Position.findById(id);
  if (!position) {
    throw new customError(message.not_found, 404);
  }

  res.status(200).json({
    success: true,
    result: position,
  });
});
