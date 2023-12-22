import { Router } from "express";
import {
  createVote,
  getOwnVote,
  getPlayersByVote,
  getVoteCount,
} from "../controllers/vote";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router.route("/").post(createVote);
router.route("/my").get(protect, getOwnVote);
router.route("/list").get(getPlayersByVote);
router.route("/count").get(getVoteCount);

export const voteRouter = router;
