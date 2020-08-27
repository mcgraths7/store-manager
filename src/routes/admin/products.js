const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productRepo = require('../../repositories/products');
const generateNewProductForm = require('../../views/admin/products/form');
const generateProductsIndexPage = require('../../views/admin/products/index');
const {
  requireProductName,
  requireProductDescription,
  requireValidProductPrice,
} = require('./validators');

const productRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

productRouter.get('/admin/products', async (req, res) => {
  // index page
  const allProducts = await productRepo.getAll();
  res
    .status(200)
    .send(generateProductsIndexPage({ req, products: allProducts }));
});

productRouter.get('/admin/products/new', (req, res) => {
  // new product form
  res.status(200).send(generateNewProductForm({ req, errors: {} }));
});

productRouter.post(
  '/admin/products/new',
  upload.single('productImage'),
  [requireProductName, requireProductDescription, requireValidProductPrice],
  async (req, res) => {
    const errors = validationResult(req);
    const { productName, productDescription, productPrice } = req.body;
    const photoBuffer = req.file.buffer;
    const photoAsBase64 = photoBuffer.toString('base64');
    // if (!errors.isEmpty()) {
    //   res.status(400).send(generateNewProductForm({ req, errors }));
    // }
    await productRepo.create({
      productName,
      productDescription,
      productPrice,
      photoAsBase64,
    });
    return res.status(200).redirect('/admin/products');
  },
);

productRouter.get('/admin/products/:id/edit', (req, res) => {
  // todo: edit product page
});

productRouter.patch('/admin/products/:id', (req, res) => {
  // todo: save the edited product
});

productRouter.delete('/admin/products/:id', (req, res) => {
  // todo: delete the product
});

module.exports = productRouter;
