var authHelper = require('../helpers/auth');

function loginRoute(req, res) {
  const parms = { 
    hotmailSignInUrl: authHelper.getAuthUrl(),
    googleSignInUrl:  "/auth/google"
  };
  res.render('login', parms);
}

module.exports = loginRoute;
