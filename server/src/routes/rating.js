const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

// Get all ratings for a movie
router.get("/movie/:movieId", async (req, res) => {
	try {
		const { movieId } = req.params;
		const ratings = await knex("rating")
			.where("movie_id", movieId)
			.select("*");
		res.json(ratings);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Add a rating for a movie by a user
router.post("/", async (req, res) => {
	try {
		const { userId, movieId, rating } = req.body;
		const [newRating] = await knex("rating")
			.insert({ user_id: userId, movie_id: movieId, rating })
			.returning("*");
		res.json(newRating);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Update a user's rating for a movie
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rating } = req.body;
		const [updatedRating] = await knex("rating")
			.where("id", id)
			.update({ rating })
			.returning("*");
		res.json(updatedRating);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Delete a rating
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await knex("rating").where("id", id).del();
		res.json({ message: "Rating deleted successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Get average rating for a movie
router.get("/movie/:movieId/average", async (req, res) => {
	try {
		const { movieId } = req.params;
		const [average] = await knex("rating")
			.where("movie_id", movieId)
			.avg("rating as average_rating");
		res.json(average);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Toggle 'watched' property
router.patch("/:id/toggle-watched", async (req, res) => {
	try {
		const { id } = req.params;
		const [updatedMovie] = await knex("rating")
			.where("id", id)
			.update({ watched: knex.raw("NOT watched") }) // Toggles the boolean value
			.returning("*");
		res.json(updatedMovie);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
