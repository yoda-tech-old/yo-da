var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');

/* GET /mail */
router.get('/', async function(req, res, next) {
  let parms = { title: 'Inbox', active: { inbox: true } };

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    try {
      // Get the 20 newest messages from inbox
      const result = await client
      .api('/me/mailfolders/inbox/messages')
      .top(20)
      .select('subject,from,receivedDateTime,isRead,body')
      .orderby('receivedDateTime DESC')
      .get();

      keys = Object.keys(result);

      // result is an object

      //const keys = result.keys()


      //const listResults = result.map(a => a.toUpperCase())

// add filtering functions here
      //const filteredResult = result.value.body.text()







/// end of filtering functions

      parms.user = userName;
      //parms.messages.body = filteredResult;

      parms.messages = result.value;
      parms.keys = keys
      //parms.keys = keys


      res.render('mail', parms);

    } catch (err) {
      parms.message = 'Error retrieving messages';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.render('error', parms);
    }

  } else {
    // Redirect to home
    res.redirect('/');
  }
});
module.exports = router;
