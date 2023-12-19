import "colors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
  connectDatabase,
  logger,
  httpHandler,
  API_PORT,
  removeId,
} from "@mva/backend";
import { router } from "./routes/_route";

const app = express();
connectDatabase();

const corsOptions = {
  origin: ["http://localhost:3000"],
  allowedHeader:
    "set-cookie, content-type, authorization, type, origins, device-id",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(logger);
app.use(removeId);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 50000,
  })
);

router(app);
app.use(httpHandler);

app.listen(API_PORT, () => {
  console.log(`Server started on ${API_PORT} port`.rainbow);
});
