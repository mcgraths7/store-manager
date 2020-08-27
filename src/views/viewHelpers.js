module.exports = {
  getErrors(errors, propName) {
    try {
      return `<p class="help is-danger">${errors.mapped()[propName].msg}</p>`;
    } catch (err) {
      return '';
    }
  },
  generateAuthButtons(userId = null) {
    if (userId) {
      return `
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a href="/admin/signout" class="button is-primary">
                <strong>Sign out</strong>
              </a>
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a href="/admin/signup" class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a href="/admin/signin" class="button is-light">
              Sign in
            </a>
          </div>
        </div>
      </div>
    `;
  },
};
