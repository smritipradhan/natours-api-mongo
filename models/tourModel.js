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
