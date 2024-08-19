const express = require('express');
const path = require('path');
const app = express();
const formController = require('./controllers/formController');
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Route to render the form
app.get('/', formController.renderForm);

// Route to handle form submissions
app.post('/submit-form', formController.submitForm);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

