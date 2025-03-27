/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("movie").del();
	await knex("movie").insert([
		{ id: 1, title: "Batman" },
		{ id: 2, title: "Iron Man" },
		{ id: 3, title: "Spider-Man" },
	]);
};
