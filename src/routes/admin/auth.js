const express = require('express');
const { validationResult } = require('express-validator');

const userRepo = require('../../repositories/users');
const generateSignupTemplate = require('../../views/admin/auth/signup');
const generateSigninTemplate = require('../../views/admin/auth/signin');
const generateLayout = require('../../views/admin/layout');
const {
  requireEmail,
  requirePasswordMinLength,
  requirePasswordMaxLength,
  requireMatchingPassword,
  requireEmailAndPasswordMatch,
  requireUniqueEmail,
} = require('./validators');

const authRouter = express.Router();

authRouter.get('/admin', (req, res) => {
  const message = req.session.userId
    ? `You are logged in as ${req.session.userId}`
    : 'You are not logged in';
  res.status(200).send(generateLayout({ req, content: message }));
});

authRouter.get('/admin/signup', (req, res) => {
  res.status(200).send(generateSignupTemplate({ req, errors: {} }));
});

authRouter.post(
  '/admin/signup',
  [
    requireEmail,
    requireUniqueEmail,
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

authRouter.get('/admin/signin', (req, res) => {
  res.status(200).send(generateSigninTemplate({ req, errors: {} }));
});

authRouter.post(
  '/admin/signin',
  [requireEmail, requireEmailAndPasswordMatch],
  async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(generateSigninTemplate({ req, errors }));
    }

    const existingUser = await userRepo.getOneBy({ email });

    req.session.userId = existingUser.id;
    return res.status(200).redirect('/');
  },
);

authRouter.get('/admin/signout', (req, res) => {
  req.session = null;
  return res.status(200).redirect('/');
});

module.exports = authRouter;
