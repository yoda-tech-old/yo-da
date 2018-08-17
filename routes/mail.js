var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var processingFunctions = require('../helpers/helpers');
var MicrosoftGraph = require('@microsoft/microsoft-graph-client');
const getDomainNames = require('../helpers/getDomainNames')

const getClient = (accessToken) => {
  const client = MicrosoftGraph.Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });
  return client
}

const renderHtmlPage = (res, parms) => {
  res.render('mail', parms);
}

const handleError = (res, err) => {
  const message = 'Error retrieving messages';
  const error = { status: `${err.code}: ${err.message}` };
  const debug = JSON.stringify(err.body, null, 2);
  const parms = { message, error, debug }
  res.render('error', parms);
}

const handler = async function(req, res, next) {
  // If credentials not provided then redirect to homepage
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  if (!accessToken && !userName) {
    res.redirect('/');
  }

  try {
    const client = getClient(accessToken)
    const endpoint = '/me/mailfolders/inbox/messages'
    const domainNames = await getDomainNames(client, endpoint)
    const parms = { domainNames, userName }
    renderHtmlPage(res, parms)
  } catch (err) {
    handleError(res, err)
  }
}

router.get('/', handler);
module.exports = router;
