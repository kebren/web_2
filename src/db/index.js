const Knex = require('knex');
const { db: dbConfig } = require('../config');

const client = new Knex(dbConfig);

async function testConnection() {
  try {
    await client.raw('SELECT NOW()');
    console.log('Database connection created');
  } catch (error) {
    console.error(error.message || error);
    throw error;
  }
}

async function getAllContacts() {
  try {
    const contactsList = await client('contacts').select('*');
    return contactsList;
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Can`t get users');
  }
}

async function deleteContact(id) {
  try {
    const contactsList = await client('contacts').where({ id }).del('*');
    return contactsList;
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Can`t delete user');
  }
}

async function createContact(data) {
  try {
    const id = await client('contacts').insert(data).returning('id');
    return id[0];
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Can`t create user');
  }
}

async function updateContact(data) {
  try {
    const { id } = data;
    delete data.id;
    await client('contacts').where({ id }).update(data);
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Can`t update user');
  }
}

async function getContact(id) {
  try {
    const contact = await client('contacts').select('*').where({ id });
    return contact[0];
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Can`t update user');
  }
}

async function updateImgUrl(id, imgUrl) {
  try {
    await client('contacts').where({ id }).update({ imgUrl });
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Can`t update image url');
  }
}

async function getImgUrl(id) {
  try {
    const url = await client('contacts').select('imgUrl').where({ id });
    return url[0].imgUrl;
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Can`t get image url');
  }
}

async function prepareDatabase() {
  try {
    await client.migrate.latest(dbConfig);
    await client.seed.run(dbConfig);
    console.log('Database preparing done');
  } catch (error) {
    console.error(error.message || error);
    throw new Error('Can`t do migrations');
  }
}

module.exports = {
  testConnection,
  getAllContacts,
  deleteContact,
  createContact,
  updateContact,
  getContact,
  updateImgUrl,
  getImgUrl,
  prepareDatabase,
};
