const { writeFile, unlink } = require('fs').promises;
const db = require('../../db');

async function getAllContacts(req, res) {
  try {
    const contactsList = await db.getAllContacts();
    res.render('index', { contacts: contactsList });
  } catch (error) {
    res.render('error', { error: error.message || 'Bad request' });
    res.status(400);
    console.error(error.message || error);
    throw error;
  }
}

async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    if (!id) throw new Error('ID required!');

    const imgUrl = await db.getImgUrl(id);
    if (imgUrl !== '/default.png') {
      await unlink(`./src/server/public/images/${id}.${imgUrl.split('.')[1]}`);
    }
    await db.deleteContact(id);

    res.redirect(301, '..');
  } catch (error) {
    res.render('error', { error: error.message || 'Bad request' });
    res.status(400);
    console.error(error.message || error);
    throw error;
  }
}

async function createContact(req, res) {
  try {
    const id = await db.createContact(req.body);
    if (req.file) {
      const imagePath = `/images/${id}.${req.file.originalname.split('.')[1]}`;
      await Promise.all([
        writeFile(`./src/server/public${imagePath}`, req.file.buffer),
        db.updateImgUrl(id, imagePath),
      ]);
    }

    res.redirect(301, '.');
  } catch (error) {
    res.render('error', { error: error.message || 'Bad request' });
    res.status(400);
    console.error(error.message || error);
    throw error;
  }
}

async function updateContact(req, res) {
  try {
    const { id } = req.params;
    if (req.file) {
      const imgUrl = await db.getImgUrl(id);
      if (imgUrl !== '/default.png') {
        await unlink(`./src/server/public/images/${id}.${imgUrl.split('.')[1]}`);
      }

      const imagePath = `/images/${req.params.id}.${req.file.originalname.split('.')[1]}`;
      await Promise.all([
        writeFile(`./src/server/public${imagePath}`, req.file.buffer),
        db.updateImgUrl(id, imagePath),
      ]);
    }

    await db.updateContact({ ...req.body, id });
    res.redirect(301, '..');
  } catch (error) {
    res.render('error', { error: error.message || 'Bad request' });
    res.status(400);
    console.error(error.message || error);
    throw error;
  }
}

async function getContact(req, res) {
  try {
    const { id } = req.params;

    if (!id) throw new Error('ID required!');

    const contact = await db.getContact(id);

    res.render('contactForm', { action: '/contacts/edit', contact });
  } catch (error) {
    res.status(400);
    res.render('error', { error: error.message || 'Bad request' });
    console.error(error.message || error);
    throw error;
  }
}

module.exports = {
  getAllContacts,
  deleteContact,
  createContact,
  updateContact,
  getContact,
};
