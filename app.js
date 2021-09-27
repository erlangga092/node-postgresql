import express from "express";
import http from "http";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import winston from "winston";
import expressWinston from "express-winston";

// route list
import userRouter from "./routes/userRoutes.mjs";
import productRouter from "./routes/productRoutes.mjs";

const app = express();
const server = http.createServer(app);

const logOption = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(expressWinston.logger(logOption));
app.use(cors());

// router
app.use("/api", userRouter);
app.use("/api", productRouter);

server.listen(3000, () => console.log(`Server connected!`));
