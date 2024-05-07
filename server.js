const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Attach Socket.io to your HTTP server

const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route to render the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Define a route to handle adding two numbers
app.get('/addtwonumbers', (req, res) => {
    // 1. Grab the values from URL parameters
    const value1 = parseInt(req.query.num1);
    const value2 = parseInt(req.query.num2);

    // 2. Perform calculation
    const result = value1 + value2;

    // 3. Return the response as a JSON object
    const response = { data: result, statusCode: 200, message: 'success' };
    res.json(response);
});

// WebSocket connection with Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events from client
    socket.on('clientMessage', (message) => {
        console.log('Message from client:', message);
        // Example: Send a message back to the client
        io.emit('serverMessage', 'Message received on server');
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server and handle errors
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
    } else {
        console.error('An error occurred while starting the server:', err);
    }
});
