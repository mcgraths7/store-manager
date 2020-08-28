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
              <form action="/admin/signout">
                <button class="button is-primary">
                  <strong>Sign out</strong>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <form action="/admin/signup">
              <button class="button is-primary">
                <strong>Sign up</strong>
              </button>
            </form>
            <form action="/admin/signin">
              <button class="button is-light">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },
};
