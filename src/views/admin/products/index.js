const generateLayout = require('../layout');

module.exports = ({ req, products }) => {
  // console.log(products);
  // const productList = products.map((product) => `
  // <li>
  //   <div class="box">
  //     <p>${product.productName}</p>
  //   </div>
  // </li>
  // `);

  // const generateProductListing = (product) => `
  //   <li>
  //     <div class="box">
  //       <p>${product.productName}</p>
  //     </div>
  //   </li>
  // `;

  return generateLayout({
    req,
    content: `
      <section class="products-list">
        <ul>
          ${products.map(
            (product) => `
            <li>
              <div class="box">
                <p>${product.productName}</p>
              </div>
            </li>
          `,
          )}
        </ul>
      </section>
    `,
  });
};
