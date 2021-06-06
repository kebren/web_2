exports.up = async (knex) => {
  await knex.schema.alterTable('contacts', (table) => {
    table.string('imgUrl').defaultTo('/default.png');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('contacts', (table) => {
    table.dropColumn('imgUrl');
  });
};
