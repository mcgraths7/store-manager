const express = require('express');

const productLandingTemplate = require('../../views/main/storefront');
const productRepo = require('../../repositories/products');

const storefrontRouter = express.Router();

storefrontRouter.get('/', async (req, res) => {
  const products = await productRepo.getAll();
  res.status(200).send(productLandingTemplate({ products }));
});

module.exports = storefrontRouter;
