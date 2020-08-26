const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const secrets = require('./secrets.json');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [secrets.key] }));
app.use(authRouter);

app.get('/', (req, res) => {
  const message = req.session.userId
    ? `You are logged in as ${req.session.userId}`
    : 'You are not logged in';
  return res.status(200).send(`${message}`);
});

app.listen(3000, () => {});
