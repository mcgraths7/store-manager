module.exports = ({ content }) => `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      </head>

      <body>
        <header>
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="/">
                <p class="subtitle">Brand Name Here</p>
              </a>
            </div>

            <div class="navbar-menu">
              <div class="navbar-start">
                <a href="/" class="navbar-item">
                  <i class="fa fa-star"></i> Products
                </a>

                <a href="/cart" class="navbar-item">
                  <i class="fa fa-shopping-cart"></i> Cart
                </a>

              </div>

              <div class="navbar-end">
                <div class="navbar-item">
                  <ul class="social">
                      <li><a href=""><i class="fab fa-facebook"></i></a></li>
                      <li><a href=""><i class="fab fa-twitter"></i></a></li>
                      <li><a href=""><i class="fab fa-linkedin"></i></a></li>
                    </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>
        ${content}
        <footer class="footer">
          <div class="content has-text-centered">
            <p>
              <strong>Made with <a href="https://bulma.io">Bulma</a></strong>
            </p>
          </div>
        </footer>
      </body>
    </html>
  `;
