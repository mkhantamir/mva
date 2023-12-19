import { Router } from "express";
import { login, logout, status } from "../controllers/auth";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router.route("/").get(status).post(login);
router.route("/logout").post(logout);

export const authRouter = router;
