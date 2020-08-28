/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');

module.exports = {
  handleErrors(templateGen, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let data = {};
        if (dataCb) {
          data = await dataCb(req);
        }
        return res.status(400).send(templateGen({ req, errors, ...data }));
      }
      next();
    };
  },
  redirectIfNotLoggedIn(req, res, next) {
    if (!req.session.userId) {
      return res.status(403).redirect('/admin/signin');
    }
    next();
  },
};
