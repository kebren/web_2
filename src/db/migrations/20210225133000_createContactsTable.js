exports.up = async (knex) => {
  await knex.schema.raw('create extension if not exists "uuid-ossp"');

  await knex.schema.createTable('contacts', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name', 255).notNullable();
    table.string('surname', 255).nullable();
    table.string('phone', 13).notNullable();
    table.string('email', 255).nullable();
    table.unique(['name', 'surname', 'phone'], 'unique_contact');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('contacts');
  await knex.schema.raw('drop extension if exists "uuid-ossp"');
};
