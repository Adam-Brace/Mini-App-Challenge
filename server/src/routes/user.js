const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

// Get all users
router.get("/", async (req, res) => {
	try {
		const users = await knex("user").select("*");
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Get a specific user by ID
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await knex("user").where("id", id).first();
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Add a new user
router.post("/", async (req, res) => {
	try {
		const { name } = req.body;
		const [newUser] = await knex("user").insert({ name }).returning("*");
		res.json(newUser);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Update a user's name
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const [updatedUser] = await knex("user")
			.where("id", id)
			.update({ name })
			.returning("*");
		res.json(updatedUser);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Delete a user
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await knex("user").where("id", id).del();
		res.json({ message: "User deleted successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Get all ratings by a specific user
router.get("/:id/ratings", async (req, res) => {
	try {
		const { id } = req.params;
		const ratings = await knex("ratings").where("user_id", id).select("*");
		res.json(ratings);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
