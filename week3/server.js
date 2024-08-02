// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit-form', (req, res) => {
  const { name, surname, email, message, dob, address } = req.body;
  res.send(`Form submitted successfully. Name: ${name}, Surname: ${surname}, Email: ${email}, Message: ${message}, Date of Birth: ${dob}, Address: ${address}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
