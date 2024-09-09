const { MongoClient } = require('mongodb');


let contactsCollection;

async function initializeDatabaseConnection() {
    const mongoClient = new MongoClient(mongoURI);
    try {
        await mongoClient.connect();
        contactsCollection = mongoClient.db("test").collection('contactUs');
        console.log("Successfully connected to the MongoDB database.");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

function fetchAllContacts(callback) {
    contactsCollection.find({}).toArray((error, documents) => {
        if (error) {
            console.error("Error retrieving contacts", error);
            callback(error, null);
        } else {
            callback(null, documents);
        }
    });
}

function addNewContact(contactData, callback) {
    contactsCollection.insertOne(contactData, (err, result) => {
        if (err) {
            console.error("Error adding contact", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

module.exports = {
    initializeDatabaseConnection,
    fetchAllContacts,
    addNewContact
};
