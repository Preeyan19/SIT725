import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Workaround for __dirname in ES Modules
const currentFile = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFile);

const server = express();
const SERVER_PORT = process.env.PORT || 3000;

// Middleware for parsing incoming requests
server.use(bodyParser.json());

// Custom validation function
function validateContactFields(contact) {
    const errors = [];
    if (!contact.name || contact.name.trim() === '') {
        errors.push('Name is required and cannot be empty.');
    }
    if (!contact.email || contact.email.trim() === '') {
        errors.push('Email is required and cannot be empty.');
    }
    if (!contact.phone || contact.phone.trim() === '') {
        errors.push('Phone number is required and cannot be empty.');
    }
    if (!contact.message || contact.message.trim() === '') {
        errors.push('Message is required and cannot be empty.');
    }
    return errors;
}

// POST route for adding a new contact
server.post('/api/contacts', (req, res) => {
    const contactData = req.body;

    // Validate contact fields using the custom validation function
    const validationErrors = validateContactFields(contactData);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    // Mock saving to the database
    const newContact = { ...contactData };

    res.status(201).json({ data: newContact, message: 'Contact has been successfully added!' });
});

// GET route for fetching contacts
server.get('/api/contacts', (req, res) => {
    // Mock fetching from the database
    const contactList = []; // Replace with actual data retrieval logic

    res.status(200).json({ data: contactList, message: 'Contacts retrieved successfully!' });
});

// Start the server
server.listen(SERVER_PORT, () => {
    console.log(`Express server is running on port ${SERVER_PORT}`);
});
