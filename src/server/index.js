const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');

const contactsRoute = require('./routes/contacts');
const checkAuth = require('./middlewares/checkAuthorization');
const authController = require('./controllers/authorization');
const {
  authorization: { sessionSecret },
} = require('../config');

const app = express();

app.set('view engine', 'pug');
app.set('views', './src/server/views/pages');

app.use('/', express.static('./src/server/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  }),
);

app.get('/', (req, res) => {
  res.render('home');
});

app
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => authController.loginUser(req, res));

app.get('/logout', (req, res) => authController.logoutUser(req, res));

app.use(checkAuth);

app.use('/contacts', contactsRoute);

module.exports = app;
