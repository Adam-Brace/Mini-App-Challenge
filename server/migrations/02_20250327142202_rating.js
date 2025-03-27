/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("rating", (table) => {
		table.increments("id").primary();
		table.integer("userId");
		table.foreign("userId").references(`user.id`);
		table.integer("movieId");
		table.foreign("movieId").references(`movie.id`);
		table.boolean("liked").defaultTo(false);
		table.boolean("watched").defaultTo(false);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("rating", (table) => {
			table.dropForeign("userId");
			table.dropForeign("movieId");
		})
		.then(function () {
			return knex.schema.dropTableIfExists("rating");
		});
};
