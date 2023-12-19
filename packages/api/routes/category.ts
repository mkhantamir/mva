import { Router } from "express";
import {
  addCategory,
  changeCategoryInfo,
  deleteCategory,
  getCategory,
  getCategories,
} from "../controllers/category";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getCategories)
  .post(protect, authorize("admin"), addCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(protect, authorize("admin"), changeCategoryInfo)
  .delete(protect, authorize("admin"), deleteCategory);

export const categoryRouter = router;
