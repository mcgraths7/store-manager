const { check } = require('express-validator');
const userRepo = require('../../repositories/users');

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email'),
  requireUniqueEmail: check('email')
    .custom(async (email) => {
      const existingUser = await userRepo.getOneBy({ email });
      if (!existingUser) {
        throw new Error('Email is already in use');
      }
    }),
  requirePasswordMinLength: check('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password too short.'),
  requirePasswordMaxLength: check('password')
    .trim()
    .isLength({ max: 30 })
    .withMessage('Password too long.'),
  requireMatchingPassword: check('passwordConfirmation')
    .trim()
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  requireEmailAndPasswordMatch: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const { email } = req.body;
      const existingUser = await userRepo.getOneBy({ email });

      if (!existingUser) {
        throw new Error('Invalid username / password combo');
      }

      const authenticated = await userRepo.authenticate(
        existingUser.password,
        password,
      );

      if (!authenticated) {
        throw new Error('Invalid username/password combo');
      }
    }),
};
