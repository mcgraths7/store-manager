const generateLayout = require('../layout');
const { getErrors } = require('../../viewHelpers');

module.exports = ({ req, errors }) => {
  const { email } = req.body;
  return generateLayout({
    req,
    content: `
    <div class="columns is-centered">
      <div class="column is-half">
          <div class="box">
            <form method="POST">
              <h3 class="title">Sign In</h3>
              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                  class="input"
                  name="email"
                  type="text"
                  placeholder="Email"
                  value="${email || ''}"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  ${getErrors(errors, 'email')}
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                  class="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  ${getErrors(errors, 'password')}
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
      </div>
    `,
  });
};
