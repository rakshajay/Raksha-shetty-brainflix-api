import express from "express";

import "dotenv/config";

import cors from "cors";
import router from "./routes/videos.js";

const app = express();

const { PORT, CORS_ORIGIN } = process.env;

app.use(express.json()); // parse incoming requests with JSON payloads

app.use(express.static("public")); // serve static files from the 'public' folder, so that we can serve images

app.use(cors({ origin: CORS_ORIGIN })); // allow cross-origin requests

app.use(router); // use apiRoutes as a middleware

console.log(PORT);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});