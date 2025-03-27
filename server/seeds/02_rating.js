/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("rating").del();
	await knex("rating").insert([
		{ id: 1, userId: 1, movieId: 3, liked: true, watched: true },
		{ id: 2, userId: 2, movieId: 1, liked: false, watched: true },
		{ id: 3, userId: 3, movieId: 2, liked: false, watched: false },
	]);
};
