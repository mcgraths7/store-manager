const express = require('express');

const cartRepo = require('../../repositories/carts');
const productRepo = require('../../repositories/products');
const cartTemplate = require('../../views/main/cart');

const cartsRouter = express.Router();

cartsRouter.get('/cart', async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartRepo.create({ products: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartRepo.getOne(req.session.cartId);
  }
  const { products } = cart;
  const cartItemPromises = products.map(async (product) => {
    const p = await productRepo.getOne(product.productId);
    return {
      productName: p.productName,
      productPrice: p.productPrice,
      productQty: product.qty,
      productId: p.id,
    };
  });
  Promise.all(cartItemPromises)
    .then((results) => {
      res.status(200).send(cartTemplate({ products: results }));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

cartsRouter.post('/cart/products/:productId', async (req, res) => {
  const { productId } = req.params;
  let cart;
  if (!req.session.cartId) {
    cart = await cartRepo.create({ products: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartRepo.getOne(req.session.cartId);
  }
  await cartRepo.modifyCart(req.session.cartId, productId, 1);
  console.log(cart.products);
  return res.status(200).redirect('/cart');
});

cartsRouter.post('/cart/products/:productId/delete', async (req, res) => {
  const { productId } = req.params;
  let cart;
  if (!req.session.cartId) {
    cart = await cartRepo.create({ products: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartRepo.getOne(req.session.cartId);
  }
  try {
    await cartRepo.modifyCart(req.session.cartId, productId, -1);
    return res.status(200).redirect('/cart');
  } catch (err) {
    return res.redirect('/');
    // Handle errors
  }
});

module.exports = cartsRouter;
