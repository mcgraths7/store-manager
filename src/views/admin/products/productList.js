const generateLayout = require('../layout');

module.exports = ({ req, products }) => {
  const transformPrice = (price) => price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const shortenDescription = (description) => {
    if (description.length < 50) {
      return description;
    }
    return `${description.slice(0, 50)}...`;
  };
  const renderedProducts = products
    .map((product) => `
      <tr>
        <td>${product.productName}</td>
        <td>${shortenDescription(product.productDescription)}</td>
        <td>${transformPrice(product.productPrice)}</td>
        <td>
          <a href="/admin/products/${product.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
          <form method="POST" action="/admin/products/${product.id}/delete">
            <button class="button is-danger">Delete</button>
          </form>
        </td>
      </tr>
    `)
    .join('');

  return generateLayout({
    req,
    content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-success">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `,
  });
};
