import express from "express";
import routes from "./routes/crmRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

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
  res.send(`Node express server running on server ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
