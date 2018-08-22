var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let parms = { title: 'Home', active: { home: true } };

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;
  } else {
    parms.hotmailSignInUrl = authHelper.getAuthUrl();
    parms.googleSignInUrl = "/auth/google"; 
  }

  res.render('index', parms);
});

module.exports = router;
