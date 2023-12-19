import { Router } from "express";
import {
  addTeam,
  changeTeamInfo,
  deleteTeam,
  getTeam,
  getTeams,
} from "../controllers/team";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router.route("/").get(getTeams).post(protect, authorize("admin"), addTeam);
router
  .route("/:id")
  .get(getTeam)
  .put(protect, authorize("admin"), changeTeamInfo)
  .delete(protect, authorize("admin"), deleteTeam);

export const teamRouter = router;
