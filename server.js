import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";
import MongoStore from "connect-mongo";

import route from "./routes/routes.js";
import session from "express-session";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, SECRET_API_KEY } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "pug");
app.locals.pretty = NODE_ENV !== "production"; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    name: "login",
    secret: SECRET_API_KEY,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/" }),
  })
);

// ==========
// App routers
// ==========

app.use("/", route);

// ==========
// App start
// ==========

await mongoose.connect("mongodb://127.0.0.1:27017/user");
app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
