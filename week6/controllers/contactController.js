const Contact = require('../models/contactModel');

const fetchContacts = (req, res) => {
    Contact.getAllContacts((error, contacts) => {
        if (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Error retrieving contacts from the database',
            });
        }
        res.json({
            statusCode: 200,
            data: contacts,
            message: 'Contacts fetched successfully!',
        });
    });
};

const createContact = (req, res) => {
    const newContact = req.body;
    Contact.postContact(newContact, (error, savedContact) => {
        if (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Error saving contact to the database',
            });
        }
        res.status(201).json({
            statusCode: 201,
            data: savedContact,
            message: 'New contact created successfully!',
        });
    });
};

module.exports = {
    fetchContacts,
    createContact,
};
