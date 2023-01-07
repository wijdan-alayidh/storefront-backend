// Application packages
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";

// Application settings
const app: express.Application = express();
const port: string = "3000";
const address: string = `localhost:${port}`;

// Setting of bodyParser for the application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting of cors for the application

/**
 * # If you need to specify cors options:
 *
 *      * uncomment:
 *       - corsOptions &
 *       - app.use(cors(corsOptions))
 *
 *      * comment:
 *       - app.use(cors());
 */

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(cors());

// Application Routes
app.use("/", routes);

// Listen Method
app.listen(port, () => {
  console.log(`your server works successfully at ->  ${address}`);
});

export default app;
