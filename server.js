const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolio-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
    serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
  }).then(() => {
    console.log('MongoDB connected');
  }).catch(err => {
    console.error('MongoDB connection error', err);
  });
  

// Routes
app.use('/', portfolioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
