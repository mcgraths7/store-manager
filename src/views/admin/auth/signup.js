/* eslint-disable indent */
const addLayout = require('../layout');

const getErrors = (errors, propName) => {
  try {
    return `<p class="help is-danger">${errors.mapped()[propName].msg}</p>`;
  } catch (err) {
    return '';
  }
};

module.exports = ({ req, errors = {} }) => {
  const { email } = req.body;

  return addLayout({
    content: `
      <div class="container">
        <div class="box">
          <form method="POST">
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  name="email"
                  type="email"
                  placeholder="Email" 
                  value="${email || ''}"
                >
                ${getErrors(errors, 'email')}
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input class="input" name="password" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                ${getErrors(errors, 'password')}
              </div>
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control has-icons-left">
                <input class="input" name="passwordConfirmation" type="password" placeholder="Confirm password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                ${getErrors(errors, 'passwordConfirmation')}
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button type="submit" class="button is-link">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
`,
  });
};
