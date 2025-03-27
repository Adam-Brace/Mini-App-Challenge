const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
const cors = require("cors");

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../../.env") });
	PORT = process.env.SERVER_PORT;
}

// Import routes
const movieRoutes = require("./routes/movie");
const ratingRoutes = require("./routes/rating");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/movies", movieRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/users", userRoutes);

const server = app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = { app, server, PORT };
