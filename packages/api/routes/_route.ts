import { Express } from "express";
import {
  authRouter,
  playerRouter,
  positionRouter,
  teamRouter,
  categoryRouter,
} from "./index";
import { voteRouter } from "./vote";
import { userRouter } from "./user";
import { shareRouter } from "./share";

export const router = (app: Express) => {
  app.use("/api/auth", authRouter);
  app.use("/api/player", playerRouter);
  app.use("/api/position", positionRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/team", teamRouter);
  app.use("/api/vote", voteRouter);
  app.use("/api/user", userRouter);
  app.use("/api/share", shareRouter);
};
