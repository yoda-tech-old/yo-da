var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var processingFunctions = require('../helpers/helpers');
var MicrosoftGraph = require('@microsoft/microsoft-graph-client');
const getDomainNames = require('../helpers/getDomainNames')

/* GET /mail */
router.get('/', async function(req, res, next) {
  let parms = { title: 'Inbox', active: { inbox: true } };

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {

    // Initialize Graph client
    const client = MicrosoftGraph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    try {
      // Get the newest messages from inbox
      const result = await client
      .api('/me/mailfolders/inbox/messages')
      .query("$search=unsubscribe")
      .select('subject,from,receivedDateTime,isRead')
      .top(1000)
      .get();

      parms.user = userName;

      parms.messages = getDomainNames(result.value)

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
