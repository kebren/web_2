const {
  authorization: { userData },
} = require('../../config');

module.exports = (req, res, next) => {
  if (req.session.user === userData.username) next();
  else res.render('login', { errorMessage: 'Authorization required!' });
};
