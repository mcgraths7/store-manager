const express = require('express');
const multer = require('multer');

const productRepo = require('../../repositories/products');
const { productFormTemplate, productIndexTemplate } = require('../../views/admin/products');
const {
  requireProductName,
  requireProductDescription,
  requireValidProductPrice,
} = require('./validators');
const { handleErrors, redirectIfNotLoggedIn } = require('./middlewares');

const productRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

productRouter.get(
  '/admin/products',
  redirectIfNotLoggedIn,
  async (req, res) => {
    const products = await productRepo.getAll();
    res.status(200).send(productIndexTemplate({ req, products }));
  },
);

productRouter.get('/admin/products/new', redirectIfNotLoggedIn, (req, res) => {
  // new product form
  res.status(200).send(productFormTemplate({ req, errors: {} }));
});

productRouter.post(
  '/admin/products/new',
  redirectIfNotLoggedIn,
  upload.single('productImage'),
  [requireProductName, requireProductDescription, requireValidProductPrice],
  handleErrors(productFormTemplate),
  async (req, res) => {
    const { productName, productDescription, productPrice } = req.body;
    let photoBuffer;
    if (req.file) {
      photoBuffer = req.file.buffer;
    } else {
      photoBuffer = '';
    }
    // photoBuffer = req.file.buffer;
    const photoAsBase64 = photoBuffer.toString('base64');
    await productRepo.create({
      productName,
      productDescription,
      productPrice,
      photoAsBase64,
    });
    return res.status(200).redirect('/admin/products');
  },
);

productRouter.get('/admin/products/:id/edit',
  redirectIfNotLoggedIn,
  async (req, res) => {
    const { id } = req.params;
    const product = await productRepo.getOne(id);
    if (!product) {
      return res.status(404).redirect('/admin/products');
    }
    return res.status(200).send(productFormTemplate({ req, errors: {}, product }));
  });

productRouter.get('/admin/products/:id', redirectIfNotLoggedIn, (req, res) => {
  const { id } = req.params;
  const product = productRepo.getOne(id);
  res.status(200).send(productFormTemplate({ req, errors: {}, product }));
});

productRouter.post(
  '/admin/products/:id/edit',
  redirectIfNotLoggedIn,
  upload.single('productImage'),
  [requireProductName, requireProductDescription, requireValidProductPrice],
  handleErrors(productFormTemplate, async (req) => {
    const { id } = req.params;
    const product = productRepo.getOne(id);
    return { product };
  }),
  async (req, res) => {
    const { id } = req.params;
    const { productName, productDescription, productPrice } = req.body;
    let attrs = { productName, productDescription, productPrice };
    if (req.file) {
      const buff = req.file.buffer;
      const fileAsBase64 = buff.toString('base64');
      attrs = { ...attrs, fileAsBase64 };
    }
    try {
      await productRepo.update(id, attrs);
      res.status(200).redirect('/admin/products');
    } catch (err) {
      res.status(400).redirect('/admin/products');
    }
  },
);

productRouter.post('/admin/products/:id/delete',
  redirectIfNotLoggedIn,
  async (req, res) => {
    const { id } = req.params;
    await productRepo.delete(id);
    res.status(200).redirect('/admin/products');
  });

module.exports = productRouter;
