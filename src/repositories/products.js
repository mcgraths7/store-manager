const crypto = require('crypto');

const Repository = require('./repository');

const randomId = () => crypto.randomBytes(4).toString('hex');

class ProductsRepository extends Repository {
  async create(attrs) {
    let { productPrice } = attrs;
    productPrice = parseFloat(productPrice) * 100;

    const newAttrs = {
      ...attrs,
      productPrice,
    };
    newAttrs.id = randomId();

    const record = {
      ...newAttrs,
    };

    const records = await super.getAll();
    records.push(record);

    await super.writeAll(records);
    return record;
  }
}

module.exports = new ProductsRepository('products.json');
