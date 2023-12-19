import { Router } from "express";
import { checkShare, uploadShare } from "../controllers/share";
import { authorize, protect } from "@mva/backend";

const router = Router({ mergeParams: true });

router.route("/").put(checkShare).post(uploadShare);

export const shareRouter = router;
