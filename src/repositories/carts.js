const crypto = require('crypto');

const Repository = require('./repository');

const randomId = () => crypto.randomBytes(4).toString('hex');

class CartsRepository extends Repository {
  async create(attrs) {
    const cart = { ...attrs };
    cart.id = randomId();

    const records = await super.getAll();
    records.push(cart);

    await super.writeAll(records);
    return cart;
  }

  async modifyCart(id, productId, value) {
    const carts = await super.getAll();
    const cart = carts.find((c) => c.id === id);
    const product = cart.products.find((p) => p.productId === productId);
    if (value === -1 && !product) {
      throw new Error('Product not in cart!');
    } else if (value === 1 && !product) {
      cart.products.push({ productId, qty: 1 });
    } else {
      const idx = cart.products.indexOf(product);
      product.qty += value;
      if (product.qty === 0) {
        cart.products.splice(idx, 1);
      } else {
        cart.products.splice(idx, 1, product);
      }
    }
    await super.writeAll(carts);
    return cart;
  }

  // async getCartDetails(id) {
  //   const cart = await super.getOne(id);
  //   if (!cart) {
  //     throw new Error(`Could not find that cart with id ${id}`);
  //   }
  //   const { products } = cart;
  //   const cartItems = products.map(async (product) => {
  //     const p = await productRepo.getOne(product.productId);
  //     return {
  //       productName: p.productName,
  //       productPrice: p.productPrice,
  //       productQty: product.qty,
  //     };
  //   });
  // }
}

module.exports = new CartsRepository('carts.json');
