let express = require("express");
let app = express();
let dbConnect = require("./dbConnect");

// dbConnect.dbConnect()
let http = require('http').createServer(app);
let io = require('socket.io')(http);

// routes
let projectsRoute = require('./routes/projects');

var port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api/projects', projectsRoute);

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var secondNumber = parseInt(req.params.secondNumber);
  var result = firstNumber + secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});

// Subtract Two Numbers
app.get('/subtractTwoNumbers/:firstNumber/:secondNumber', function(req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var secondNumber = parseInt(req.params.secondNumber);
  var result = firstNumber - secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});

// Multiply Two Numbers
app.get('/multiplyTwoNumbers/:firstNumber/:secondNumber', function(req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var secondNumber = parseInt(req.params.secondNumber);
  var result = firstNumber * secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});

// Fetch Project Details (Example)
app.get('/api/projectDetails', function(req, res, next) {
  // Example response, replace with actual logic to fetch project details
  res.json({
    projectName: "Project X",
    projectId: "12345",
    description: "A sample project"
  }).status(200);
});

// socket.io integration
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Send a random number every second
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

// Listen on the specified port
http.listen(port, () => {
  console.log("Listening on port ", port);
});
