const layoutTemplate = require('./layout');
const { transformPrice } = require('../viewHelpers');

module.exports = ({ products }) => {
  const totalPrice = products.reduce((total, currentProduct) => (
    total + (currentProduct.productPrice * currentProduct.productQty)), 0);
  const renderedItems = products
    .map((product) => `
        <div class="cart-item message">
          <h3 class="subtitle">${(product.productName)}</h3>
          <div class="cart-right">
            <div>
              ${transformPrice(product.productPrice)} X  ${product.productQty} = 
            </div>
            <div class="price is-size-4">
              ${transformPrice(product.productPrice * product.productQty)}
            </div>
            <div class="remove">
              <form method="POST" action="/cart/products/${product.productId}/delete" >
                <button class="button is-danger">
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `)
    .join('');

  return layoutTemplate({
    content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total
              </div>
              <h1 class="title">${transformPrice(totalPrice)}</h1>
              <button class="button is-primary">Buy</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `,
  });
};
