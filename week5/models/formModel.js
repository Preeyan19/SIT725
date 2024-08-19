const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://preeyanshivangekar12345:preeyanPS@cluster0.yn7bt.mongodb.net/';
const dbName = 'Preeyan';
const collectionName = 'submission';

exports.saveFormData = async (formData) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(formData);
    client.close();
};
