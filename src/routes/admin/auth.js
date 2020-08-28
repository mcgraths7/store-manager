const express = require('express');

const userRepo = require('../../repositories/users');
const { signupTemplate, signinTemplate } = require('../../views/admin/auth');
const adminLayoutTemplate = require('../../views/admin/layout');
const {
  requireEmail,
  requirePasswordMinLength,
  requirePasswordMaxLength,
  requireMatchingPassword,
  requireEmailAndPasswordMatch,
  requireUniqueEmail,
} = require('./validators');
const { handleErrors } = require('./middlewares');

const authRouter = express.Router();

authRouter.get('/admin', (req, res) => {
  const message = req.session.userId
    ? `You are logged in as ${req.session.userId}`
    : 'You are not logged in';
  res.status(200).send(adminLayoutTemplate({ req, content: message }));
});

authRouter.get('/admin/signup', (req, res) => {
  res.status(200).send(signupTemplate({ req, errors: {} }));
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
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    const newUser = await userRepo.create({ email, password });
    const { id } = newUser;
    req.session.userId = id;
    return res.status(200).redirect('/admin/products');
  },
);

authRouter.get('/admin/signin', (req, res) => {
  res.status(200).send(signinTemplate({ req, errors: {} }));
});

authRouter.post(
  '/admin/signin',
  [requireEmail, requireEmailAndPasswordMatch],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const existingUser = await userRepo.getOneBy({ email });

    req.session.userId = existingUser.id;
    return res.status(200).redirect('/admin/products');
  },
);

authRouter.get('/admin/signout', (req, res) => {
  req.session = null;
  return res.status(200).redirect('/');
});

module.exports = authRouter;
