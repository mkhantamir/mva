import { Router } from "express";
import { checkVoted } from "../controllers/user";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router.route("/").get(protect, checkVoted);

export const userRouter = router;
