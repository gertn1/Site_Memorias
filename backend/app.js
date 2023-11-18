/*

const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./db');

const port = process.env.PORT || 3000;

const pictureRouter = require('./routes/picture');

app.use(cors()); // Middleware CORS

app.use('/pictures', pictureRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
*/
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./db');

const port = process.env.PORT || 3000;

app.use(cors()); // Middleware CORS
app.use(express.json()); // Middleware para analisar o corpo das solicitações como JSON

const pictureRouter = require('./routes/picture');
app.use('/pictures', pictureRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});




