const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/surveyDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model for the survey data
const surveySchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    experience: String,
    interests: [String],
    suggestions: String,
    age: String
});

const Survey = mongoose.model('Survey', surveySchema);

// Serve the form (replace with your frontend path)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit-survey', (req, res) => {
    const surveyData = new Survey({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        experience: req.body.experience,
        interests: req.body.interests,
        suggestions: req.body.suggestions,
        age: req.body.age
    });

    surveyData.save((err) => {
        if (err) {
            res.status(500).send('Error saving data.');
        } else {
            res.send('Thank you for your submission!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
