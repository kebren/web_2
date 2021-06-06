exports.seed = async (knex) => {
  await knex('contacts').del();

  await knex('contacts').insert([
    {
      name: 'Олександр',
      surname: 'Кулик',
      phone: '+380990987718',
      email: 'sawa3301@gmail.com',
    },
    {
      name: 'Віталій',
      surname: 'Мовсесян',
      phone: '+380973681374',
    },
  ]);
};
