const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const secrets = require('./secrets.json');
const authRouter = require('./routes/admin/auth');
const productRouter = require('./routes/admin/products');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [secrets.key] }));
app.use(authRouter);
app.use(productRouter);

app.get('/', (req, res) => res.status(200).redirect('/admin'));

app.listen(3000, () => {});
