// require('./myStyles.scss');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const userRepo = require('../repositories/users');
const secrets = require('./secrets.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [secrets.key] }));

app.get('/', (req, res) => {
  const message = req.session.userId
    ? `You are logged in as ${req.session.userId}`
    : 'You are not logged in';
  return res.status(200).send(`${message}`);
});

app.get('/signup', (req, res) => {
  res.status(200).send(`
    <form method="POST">
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <input type="password" name="passwordConfirmation" placeholder="confirm password" />
      <button type="submit">Sign up</button>
    </form>
  `);
});

app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await userRepo.getOneBy({ email });
  if (Object.keys(existingUser).length > 0) {
    res.status(400).send('Email in use');
  }
  if (password !== passwordConfirmation) {
    res.status(400).send('Passwords must match');
  }
  const newUser = await userRepo.create({ email, password });
  const { id } = newUser;
  req.session.userId = id;
  return res.status(200).redirect('/');
});

app.get('/signin', (req, res) => {
  res.send(`
    <form method="POST">
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Log in</button>
    </form>
  `);
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userRepo.getOneBy({ email });

  if (!existingUser) {
    return res.status(404).send('Email not found');
  }

  if (existingUser.password !== password) {
    return res.status(400).send('Password does not match');
  }

  req.session.userId = existingUser.id;
  return res.status(200).redirect('/');
});

app.get('/signout', (req, res) => {
  req.session = null;
  return res.status(200).redirect('/');
});

app.listen(3000, () => {});
