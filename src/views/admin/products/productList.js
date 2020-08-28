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
    .map(
      (product) => `
      <tr>
        <td class="normal-cell">${product.productName}</td>
        <td class="wide-cell">${shortenDescription(product.productDescription)}</td>
        <td class="normal-cell">${transformPrice(product.productPrice)}</td>
        <td class="normal-cell">
          <form action="/admin/products/${product.id}/edit">
            <button class="button is-link">Edit</button>
          </form>
        </td>
        <td class="normal-cell">
          <form action="/admin/products/${product.id}/delete">
            <button class="button is-danger">Delete</button>
          </form>
        </td>
      </tr>
    `,
    )
    .join('');

  return generateLayout({
    req,
    content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>
        <form action="/admin/products/new">
          <button class="button is-success">New Product</a>
        </form>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="normal-cell">Title</th>
            <th class="wide-cell">Description</th>
            <th class="normal-cell">Price</th>
            <th class="normal-cell"></th>
            <th class="normal-cell"></th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `,
  });
};
