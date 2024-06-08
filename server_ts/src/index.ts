import express from "express";
// import cors from "cors";
import { Express, Request, Response, NextFunction } from "express";
// const connect = require("./config/database-config");
// import { PORT } from "./config/server-config";
// const routing = require("./routes/index");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("../swagger/swagger.json");
const app: Express = express();

// app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use("/api", routing);

console.log("test-commit");

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  //   const status = error.statusCode || 500;
  //   res.status(status).json({
  //     success: false,
  //   });
});

const startServer = () => {
  app.listen(3000, async () => {
    console.log(`Server started at port 3000`);
    // await connect();
  });
};
startServer();
