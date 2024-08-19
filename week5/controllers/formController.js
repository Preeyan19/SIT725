const path = require('path');
const FormModel = require('../models/formModel');

exports.renderForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

exports.submitForm = async (req, res) => {
    try {
        const formData = req.body; // Get the form data from the request body
        await FormModel.saveFormData(formData);
        console.log("Form submitted and data inserted:", formData);
        res.send('Form submitted successfully!');
    } catch (err) {
        console.error("Error handling form submission", err);
        res.status(500).send('Error submitting form');
    }
};
