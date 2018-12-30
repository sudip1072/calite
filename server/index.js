const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const Rental = require('./models/rental');

const rentalRoutes = require('./routes/rentals'),
       userRoutes = require('./routes/users');

const FakeDb = require('./fake-db');

mongoose.connect(config.DB_URI,{ useNewUrlParser: true }).then(()=>{
  const fakeDb = new FakeDb();
  fakeDb.seedDb();
});
const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3001;


app.listen(PORT , function() {
    console.log('App is running!');
  });