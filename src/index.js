const qs = require('querystring');
const express = require('express');

const app = express();

const GITHUB_AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';

app.use((req, _, next) => {
  console.log(`${req.method} – ${req.path}`);
  next();
});

const oidcRouter = new express.Router();

oidcRouter.get('/authorize', (req, res) => {
  const query = {
    client_id: req.query.client_id,
    scope: req.query.scope
      .split(' ')
      .filter((s) => s != 'openid')
      .join(' '),
    state: req.query.state,
    response_type: req.query.response_type,
  };

  return res.redirect(`${GITHUB_AUTHORIZATION_URL}?${qs.stringify(query)}`);
});

app.use('/oidc', oidcRouter);

app.listen(8080, () => console.log('Listening on 8080'));
