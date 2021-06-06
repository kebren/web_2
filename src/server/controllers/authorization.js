const {
  authorization: { userData },
} = require('../../config');

function loginUser(req, res) {
  const { username, password } = req.body;

  if (username === userData.username && password === userData.password) {
    req.session.user = username;
    res.redirect('/contacts');
  } else res.render('login', { errorMessage: 'Incorrect login and/or password', login: username });
}

function logoutUser(req, res) {
  req.session.destroy();
  res.redirect('/login');
}

module.exports = {
  loginUser,
  logoutUser,
};
