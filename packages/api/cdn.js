const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://localhost:3000"],
  allowedHeader:
    "set-cookie, content-type, authorization, type, origins, device-id",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  "/cdn",
  createProxyMiddleware({
    target: "https://mesa.b-cdn.net/",
    changeOrigin: true,
    pathRewrite: {
      [`^/cdn`]: "",
    },
  })
);
app.listen(3275, () => {
  console.log(`Starting Proxy at 3275`);
});
