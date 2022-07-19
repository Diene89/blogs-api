const express = require('express');
require('express-async-errors');
const categoryRoute = require('./database/routes/categoryRoutes');
const loginRoute = require('./database/routes/loginRoutes');
const userRoute = require('./database/routes/userRoutes');
const error = require('./middlewares.js/error');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);

app.use('/user', userRoute);

app.use('/categories', categoryRoute);

app.use(error);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
