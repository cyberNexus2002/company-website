const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Contact = require('../models/Contact');

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a service
router.post('/services', async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image
  });
  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create contact message
router.post('/contact', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;