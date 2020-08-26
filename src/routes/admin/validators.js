const { check, body } = require('express-validator');
const userRepo = require('../../repositories/users');

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async (email) => {
      const existingUser = await userRepo.getOneBy({ email });
      if (Object.keys(existingUser).length > 0) {
        throw new Error('Email is already in use');
      }
    }),
  requirePasswordMinLength: check('password').isLength({ min: 6 }).withMessage('Password too short.'),
  requirePasswordMaxLength: check('password').isLength({ max: 30 }).withMessage('Password too long.'),
  requireMatchingPassword: check('passwordConfirmation').custom(
    (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    },
  ),
};
