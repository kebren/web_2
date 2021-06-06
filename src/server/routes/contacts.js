const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const multer = require('multer');

const contactsController = require('../controllers/contact');

const upload = multer();
const contact = Router();

contact.get(
  '/',
  asyncHandler(async (req, res) => contactsController.getAllContacts(req, res)),
);

contact
  .route('/create')
  .get((req, res) => res.render('contactForm', { action: '/contacts/create' }))
  .post(
    upload.single('picture'),
    asyncHandler(async (req, res) => {
      await contactsController.createContact(req, res);
    }),
  );

contact
  .route('/edit/:id')
  .get(asyncHandler(async (req, res) => contactsController.getContact(req, res)))
  .post(
    upload.single('picture'),
    asyncHandler(async (req, res) => contactsController.updateContact(req, res)),
  );

contact.get(
  '/delete/:id',
  asyncHandler(async (req, res) => contactsController.deleteContact(req, res)),
);

module.exports = contact;
