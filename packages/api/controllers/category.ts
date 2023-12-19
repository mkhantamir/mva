import {
  Category,
  asyncHandler,
  customError,
  message,
  objectCleaner,
} from "@mva/backend";

export const addCategory = asyncHandler(async (req, res) => {
  const data = objectCleaner(req.body, ["label", "icon"]);
  await Category.create(data);

  res.status(200).json({
    success: true,
    message: message.added,
  });
});
export const changeCategoryInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = objectCleaner(req.body, ["label"]);
  const team = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!team) {
    throw new customError(message.not_found, 404);
  }

  res.status(200).json({
    success: true,
    message: message.updated,
  });
});
export const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new customError(message.not_found, 404);
  }
  res.status(200).json({
    success: true,
    message: message.deleted,
  });
});

// ---------- USER ----------

export const getCategories = asyncHandler(async (req, res) => {
  const category = await Category.find();

  res.status(200).json({
    success: true,
    result: category,
  });
});

export const getCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    throw new customError(message.not_found, 404);
  }

  res.status(200).json({
    success: true,
    result: category,
  });
});
