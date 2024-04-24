// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Send random numbers to connected clients every second
    setInterval(() => {
        socket.emit('number', Math.floor(Math.random() * 10));
    }, 1000);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
