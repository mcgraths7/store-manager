const crypto = require('crypto');

const Repository = require('./repository');

const randomId = () => crypto.randomBytes(4).toString('hex');

class ProductsRepository extends Repository {
  async create(attrs) {
    const newPrice = parseFloat(attrs.productPrice);
    const record = {
      ...attrs,
      newPrice,
    };
    record.id = randomId();

    const records = await super.getAll();
    records.push(record);

    await super.writeAll(records);
    return record;
  }
}

module.exports = new ProductsRepository('products.json');
