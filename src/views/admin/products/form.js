const generateLayout = require('../layout');
const { getErrors } = require('../../viewHelpers');

module.exports = ({ req, errors }) => {
  const { productName, productDescription, productPrice } = req.body;
  // console.log(productName);
  return generateLayout({
    req,
    content: `
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="box">
          <h2 class="subtitle">Create a new product</h2>
          <form method="post" enctype="multipart/form-data">
            <div class="field">
              <label class="label"><strong>Product Name</strong></label>
              <div class="control">
                <input
                name="productName"
                class="input"
                type="text"
                placeholder="Product name"
                value="${productName || ''}"
                >
              </div>
              ${getErrors(errors, 'productName')}
            </div>
            <div class="field">
              <label class="label"><strong>Product Description</strong></label>
              <div class="control">
                <textarea
                name="productDescription"
                class="textarea"
                placeholder="Some descriptive text..."
                value="${productDescription || ''}"
                ></textarea>
              </div>
              ${getErrors(errors, 'productDescription')}
            </div>
            <div class="field">
              <label class="label"><strong>Price</strong></label>
              <div class="control has-icons-left">
                <input
                name="productPrice"
                class="input"
                type="text"
                placeholder="0.00"
                value="${productPrice || ''}"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-dollar-sign"></i>
                </span>
              </div>
              ${getErrors(errors, 'productPrice')}
            </div>
            <div class="field">
              <div class="file">
                <label class="file-label">
                  <input class="file-input" type="file" name="productImage">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="buttons">
              <p class="control">
                <button type="submit" class="button is-link">
                  Submit
                </button>
              </p>
              <p class="control">
                <a href="/admin/products" class="button is-light">
                  Cancel
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  });
};
