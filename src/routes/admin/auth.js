const express = require('express');
const { validationResult } = require('express-validator');

const userRepo = require('../../repositories/users');
const generateSignupTemplate = require('../../views/admin/auth/signup');
const generateSigninTemplate = require('../../views/admin/auth/signin');
const {
  requireEmail,
  requirePasswordMinLength,
  requirePasswordMaxLength,
  requireMatchingPassword,
} = require('./validators');

const authRouter = express.Router();

authRouter.get('/signup', (req, res) => {
  res.status(200).send(generateSignupTemplate({ req, errors: {} }));
});

authRouter.post(
  '/signup',
  [
    requireEmail,
    requirePasswordMinLength,
    requirePasswordMaxLength,
    requireMatchingPassword,
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(
        generateSignupTemplate({
          req,
          errors,
        }),
      );
    }

    const newUser = await userRepo.create({ email, password });
    const { id } = newUser;
    req.session.userId = id;
    return res.status(200).redirect('/');
  },
);

authRouter.get('/signin', (req, res) => {
  res.status(200).send(generateSigninTemplate());
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userRepo.getOneBy({ email });

  if (!existingUser) {
    return res.status(404).send('Email not found');
  }

  const authenticated = await userRepo.authenticate(
    existingUser.password,
    password,
  );

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
