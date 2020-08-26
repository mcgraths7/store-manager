const express = require('express');

const userRepo = require('../../repositories/users');

const authRouter = express.Router();

authRouter.get('/signup', (req, res) => {
  res.status(200).send(`
    <form method="POST">
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <input type="password" name="passwordConfirmation" placeholder="confirm password" />
      <button type="submit">Sign up</button>
    </form>
  `);
});

authRouter.post('/signup', async (req, res) => {
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

authRouter.get('/signin', (req, res) => {
  res.send(`
    <form method="POST">
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Log in</button>
    </form>
  `);
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userRepo.getOneBy({ email });

  if (!existingUser) {
    return res.status(404).send('Email not found');
  }

  const authenticated = await userRepo.authenticate(existingUser.password, password);

  if (!authenticated) {
    return res.status(401).send('Password does not match');
  }

  req.session.userId = existingUser.id;
  return res.status(200).redirect('/');
});

authRouter.get('/signout', (req, res) => {
  req.session = null;
  return res.status(200).redirect('/');
});

module.exports = authRouter;
