const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const secrets = require('./src/secrets.json');
const authRouter = require('./src/routes/admin/auth');
const productRouter = require('./src/routes/admin/products');
const storefrontRouter = require('./src/routes/main/storefront');
const cartsRouter = require('./src/routes/main/carts');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [secrets.key] }));
app.use(authRouter);
app.use(productRouter);
app.use(storefrontRouter);
app.use(cartsRouter);

app.listen(3000, () => {});
