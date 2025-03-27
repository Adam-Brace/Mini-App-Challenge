const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

// Get all movies
router.get("/", async (req, res) => {
	try {
		const movies = await knex("movie").select("*");
		res.json(movies);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Add a new movie
router.post("/", async (req, res) => {
	try {
		const { title } = req.body;
		const [newMovie] = await knex("movie").insert({ title }).returning("*");
		res.json(newMovie);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Search for movies by title
router.get("/search", async (req, res) => {
	try {
		const { title } = req.query;
		const movies = await knex("movie")
			.where("title", "ILIKE", `%${title}%`)
			.select("*");
		res.json(movies);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Delete a movie
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await knex("movie").where("id", id).del();
		res.json({ message: "Movie deleted successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
