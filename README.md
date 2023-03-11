# Natours API with MONGO

## Connecting Database with Express App

We connect our Application to the Database using a Driver. Mongoose is Object Data Modelling built on top of Mongo DB Driver providing developer with a way to model thier data. It is akin to an Object Relational Mapper (ORM) such as
SQLAlchemy for traditional SQL databases. The problem that Mongoose aims to solve is allowing developers to enforce a specific schema at the application layer.
For more information refer - https://www.mongodb.com/developer/languages/javascript/mongoose-versus-nodejs-driver/

```
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Hey');
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```
