import { Router } from "express";
import {
  addPlayer,
  changePlayerInfo,
  deletePlayer,
  getPlayer,
  getPlayers,
} from "../controllers/player";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router.route("/").get(getPlayers).post(protect, authorize("admin"), addPlayer);
router
  .route("/:id")
  .get(getPlayer)
  .put(protect, authorize("admin"), changePlayerInfo)
  .delete(protect, authorize("admin"), deletePlayer);

export const playerRouter = router;
