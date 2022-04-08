// configuracion del servidor
import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as prueba from "./db";
import path from "path";

// import routes

import flow from "./routes/flow.routes";

prueba.database();
const app = express();

// settings
app.set("port", process.env.PORT || 4015);

// middlewares
app.use(cors());
app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended: false,
    useUnifiedTopology: true,
  })
); // imagenes que vengan desde formularios
app.use(express.json()); // tener objetos json
app.use("/public", express.static(path.join(__dirname, "./public"))); // permitir acceso a public desde el navegador

// Routes
app.use("/api", flow);

export default app;
