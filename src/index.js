import express from "express";
import routes from "./routes/crmRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { path } from "express/lib/application";

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
app.use(cors());

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// Serving static files
app.use(express.static("public"));

// Index homepage
app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} \nOpen http://localhost:${PORT}`
  );
});
