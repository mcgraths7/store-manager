const addLayout = require('../layout');

module.exports = () => addLayout({
  content: `
  <div class="container">
    <div class="box">
      <form method="POST">
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input class="input" name="email" type="text" placeholder="Email">
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
