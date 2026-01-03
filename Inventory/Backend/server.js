require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemsRouter = require('./routes/items');
const transactionsRouter = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRouter);
app.use('/api/transactions', transactionsRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inventory';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} mongo db connected`));
  })
  .catch((err) => console.error('Mongo connection error:', err));
