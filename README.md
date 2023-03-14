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

In our Request Response Cycle , Request will hit one of our Routers, we have multiple Routers - tours , users etc.Now the goal of the Router is to delegate the request to the correct handler functions,which will be in one of our controllers for each of our Resources.Then depending on the incoming Request the controller might need to interact with one of the models , for example to retrieve a certain document from the Database or to create a new one.After getting the data from the Model, the controller might be ready to send back a response to the client for example containing the Data.

Now in case we want to actually render a Website , after getting the Data from the Model, the controller will select one of the View Template and inject Data into it.That rendered website will then be send back as the response.In the View layer of the Express app there is one view template for each page.

### Application Vs Bussiness Logic

Application Logic (Controller) -

- Code that is concerned about the applications implementaion,not the underlying business problem we are trying to solve (eg showing and selling tours).
- Concerned about managing requests and responses
- About the Apps technical Aspects
- Bridge between model and View Layers

Business Logic (Model) -

- Code that actually solves the businness problem we set to solve
  -Directly related to business rules,how the business works and business needs.
  Example - Creating new tours , checkoing if users password is correct , Validating User Inputs Data, Ensuring only Users who bouhgt a tour can review it.

---

## Refactoring for MVC

We already created controller and routes now we will create models.

----model
-tourModel.js
-userModel.js

tourModel.js

```
const mongoose = require('mongoose');

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

module.exports = Tour;
```

All our Schema and model is in the tourModel.js file.
So, now where do we actually need this tour?Where are we actually going to create , query ,delete and update tours.We are going to do that in the tourController.

## Another Way of CREATING DOCUMENT (POST)

We are going to handle the createTour function (POST request)

```
//POST Request will be handled here
exports.createTour = async (req, res) => {
  try {
    //  const newTour = new Tour({});
    //  newTour.save();
    const newTour = await Tour.create(req.body); //Data which came
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: err //We can change this and understand Error Handling in a better way
    });
  }
};
```

POSTMAN Body

```
{
  "name": "Varkala",
  "duration":10 ,
  "difficulty":"medium",
  "price":900,
  "rating":5
}
```

If we try again with the same Data ,it will show error.
If we miss the required field , it will show error.
<img width="1440" alt="Screenshot 2023-03-12 at 11 38 22 PM" src="https://user-images.githubusercontent.com/47382260/224563869-1eec138c-6566-4150-9455-6d19a1d9253c.png">

## READING DOCUMENTS (GET all tours)

```
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      data: {
        tours
      }
    });
  } catch (err) {
    console.log(err);
  }
};
```

Tour.find(); will give us all the tour information in a desired format.
OUTPUT IN POSTMAN

```
{
   "status": "success",
   "data": {
       "tours": [
           {
               "rating": 4.7,
               "_id": "640de148702043362c054126",
               "name": "The Forest Hiker",
               "price": 497,
               "__v": 0
           },
           {
               "rating": 4.5,
               "_id": "640de1d856cac636a96fd81d",
               "name": "The Park Camper",
               "price": 997,
               "__v": 0
           },
           {
               "rating": 5,
               "_id": "640e130a5dda1542b5f77a3e",
               "name": "Varkala",
               "price": 900,
               "__v": 0
           }
       ]
   }
}
```

## READING DOCUMENTS (GET tour by ID)

Get Call on 127.0.0.1:3000/api/v1/tours/640de148702043362c054126
getting the id using req.params.id

```
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //id here because in routes we named it as /:id
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err
    });
  }
};
```

OUTPUT IN POSTMAN

```
{
    "status": "success",
    "data": {
        "tour": {
            "rating": 4.7,
            "_id": "640de148702043362c054126",
            "name": "The Forest Hiker",
            "price": 497,
            "__v": 0
        }
    }
}
```

## UPDATING DOCUMENTS (PATCH)

```
exports.updateTour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: 'Invalid Entry'
    });
  }
};
```

Raw json

```
{
    "price":500
}
```

OUTPUT In postman

```
{
    "status": "success",
    "data": {
        "tour": {
            "rating": 5,
            "_id": "640e130a5dda1542b5f77a3e",
            "name": "Varkala",
            "price": 500,
            "__v": 0
        }
    }
}
```

The output is with the updated price Data
