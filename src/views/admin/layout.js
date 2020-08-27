const { generateAuthButtons } = require('../viewHelpers');

module.exports = ({ req, content }) => {
  const { userId } = req.session;
  const authButtons = userId ? generateAuthButtons(userId) : generateAuthButtons();
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css"
      integrity="sha512-ADrqa2PY1TZtb/MoLZIZu/Z/LlPaWQeDMBV73EMwjGam43/JJ5fqW38Rq8LJOVGCDfrJeOMS3Q/wRUVzW5DkjQ=="
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
      integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="/css/main.css" />
    <title>Store Manager</title>
  </head>
   <body class="admin">
        <header>
          <nav class="navbar navbar-bottom">
            <div class="container navbar-container">
              <div class="navbar-brand">
                <a class="navbar-item" href="/admin/products">
                  <h2 class="title">Admin Panel</h2>
                </a>
              </div>
              <div class="navbar-item">
                <div class="navbar-start">
                  <div class="navbar-item">
                    <a href="/admin/products"><i class="fa fa-star"></i> Products</a>
                  </div>
                </div>
              </div>
              ${authButtons}
            </div>
          </div>
          </nav>
        </header>
    <div class="container">
      ${content}
    </div>
  </body>
</html>
`;
};
