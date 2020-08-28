const layoutTemplate = require('./layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => `
        <div class="column is-one-quarter">
          <div class="card product-card">
            <figure>
              <img src="data:image/png;base64, ${product.productImage}"/>
            </figure>
            <div class="card-content">
              <h3 class="subtitle">${product.productName}</h3>
              <h5>$${product.productPrice}</h5>
            </div>
            <footer class="card-footer">
              <form action="/cart/products/${product.id}" method="POST">
                <button class="button has-icon is-inverted">
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
              </form>
            </footer>
          </div>
        </div>
      `)
    .join('\n');

  return layoutTemplate({
    content: `
      <section>
        <div class="container">
          <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
              <div>
                <h2 class="title text-center">Featured Items</h2>
                <div class="columns products">
                  ${renderedProducts}  
                </div>
              </div>
            </div>
            <div class="column "></div>
          </div>
        </div>
      </section>
    `,
  });
};
