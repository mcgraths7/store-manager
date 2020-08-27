module.exports = {
  getErrors(errors, propName) {
    try {
      return `<p class="help is-danger">${errors.mapped()[propName].msg}</p>`;
    } catch (err) {
      return '';
    }
  },
};
