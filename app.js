import express from "express";
import { config } from "./config.js";
import { router } from "./router.js";

const app = express();

app.use("/", router);

app.listen(config.port, () => {
  console.log(`Listening on ${config.port}`);
});
