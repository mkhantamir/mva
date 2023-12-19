import { Router } from "express";
import {
  addPosition,
  changePositionInfo,
  deletePosition,
  getPosition,
  getPositions,
} from "../controllers/position";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getPositions)
  .post(protect, authorize("admin"), addPosition);
router
  .route("/:id")
  .get(getPosition)
  .put(protect, authorize("admin"), changePositionInfo)
  .delete(protect, authorize("admin"), deletePosition);

export const positionRouter = router;
