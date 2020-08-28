const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const secrets = require('./secrets.json');
const authRouter = require('./routes/admin/auth');
const productRouter = require('./routes/admin/products');
const storefrontRouter = require('./routes/main/storefront');
const cartsRouter = require('./routes/main/carts');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [secrets.key] }));
app.use(authRouter);
app.use(productRouter);
app.use(storefrontRouter);
app.use(cartsRouter);

app.listen(3000, () => {});
