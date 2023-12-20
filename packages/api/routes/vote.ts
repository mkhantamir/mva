import { Router } from "express";
import { createVote, getOwnVote } from "../controllers/vote";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router.route("/").post(createVote);
router.route("/my").get(protect, getOwnVote);

export const voteRouter = router;
