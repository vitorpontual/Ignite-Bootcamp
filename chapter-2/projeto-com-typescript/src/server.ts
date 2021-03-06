import express, { response } from "express";
import swaggerUi from "swagger-ui-express";

import {routes} from "./routes/index";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.listen(5555, () => console.log("Server is running!"));