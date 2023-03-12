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

## Creating a Simple Tour Model

A schema and a model for our Application.Mongoose is all about models and models are like blueprints for our documents (we can think it as a class). We create Model in Mongoose in order to create documents using it and also to query update and delete these documents.And in order to perform CRUD Operations we need a Model and in order to create a model we need a Schema.
We use Schema to describe our data , to set default Values , to validate our data etc.

eg. Most basic way to create a Schema

```
const tourSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  price: Number
})

```

We can write Schema type options for some fields.

```

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'] ,//This field is required .These object are Schema type options
    unique:true
  },
  rating: {
    type:Number,
    default:4.5 //If we forget to define then the default value will be 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

```

Create a model using Schema

```
const Tour = mongoose.model('Tour', tourSchema);
```

Take the first as the Model Name and the second is the Schema.

## Creating Documents and Testing the Model

we are going to create a new document created out of out tourModel
server.js

```
const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497
});

```

testTour is a instance of a Tour Model .And it has a couple of methods on it that we can use in order to interact with the Database.
This can use used to save the document in the Database. Now this save here will return a promise that we can consume.

server.js

```
testTour
  .save()
  .then(doc => {
    console.log('Document', doc);
  })
  .catch(err => {
    console.log('Error!!', err);
  });
```

OUTPUT in Terminal : -

```
Document {
  rating: 4.7,
  _id: 640ddfc49bfa95350ac5bbaa,
  name: 'The Forest Hiker',
  price: 497,
  __v: 0
}
```

Final Code (as of now)--

```
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

let DB = process.env.DATABASE;
DB = DB.replace('<PASSWORD>', process.env.PASSWORD);

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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], //This field is required .These object are Schema type options
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5 //If we forget to define then the default value will be 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  price: 997
});

testTour
  .save()
  .then(doc => {
    console.log('Document', doc);
  })
  .catch(err => {
    console.log('Error!!', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

If we try to save , we get the error because the name should be unique;

## Introduction to Back-End Architecture: MVC , Types of Logic and More

In this project we are going to use a widely used Architecture called as MVC Architecture . Model View Controller Architecture.
Model Layer concerned with everything about the Applications Data and the Business Logic.
Controller Layer - Handle Applications request,interact with Models,and send send back responses to the Client.(Application Logic).
View Layer - Graphical Interface of our app. In other words if we are building a server side rendered websites. In this case, the view layer consists basically of templates used to generate the View,so the website that we are going to send back to the client.
