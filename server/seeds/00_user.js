/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user").del();
	await knex("user").insert([
		{ id: 1, name: "coldRabbit" },
		{ id: 2, name: "shocking consequently" },
		{ id: 3, name: "standard good natured" },
	]);
};
