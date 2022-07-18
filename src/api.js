const express = require('express');
require('express-async-errors');
const loginRoute = require('./database/routes/userRoutes');
const error = require('./helpers/error');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);

app.use(error);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
