// require('./myStyles.scss');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/signup', (req, res) => {
  res.send(`
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="confirm password" />
      <button type="submit">Sign up</button>
    </form>
  `);
});

app.post('/signup', (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {});
