const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {};

exports.getTour = (req, res) => {};

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
      message: 'Invalid Entry'
    });
  }
};

exports.updateTour = (req, res) => {};

exports.deleteTour = (req, res) => {};
