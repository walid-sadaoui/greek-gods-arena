import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./common/error/error.middleware";
import notFoundHandler from "./common/error/not-found.middleware";
import config from "./config";
import fightsRouter from "./apps/fights";
import teamsRouter from "./apps/teams";

const app = express();
app.use(helmet());
config.nodeEnv == "development" && app.use(logger("dev"));
app.use(
  cors({
    credentials: true,
    origin: config.clientUrl,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  })
);
app.use(express.json());

app.use("/fights", fightsRouter);
app.use("/teams", teamsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
