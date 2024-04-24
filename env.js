let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('number', (msg) => {
    console.log('Random number received:', msg);
    document.getElementById('output').innerText = 'Random number: ' + msg;
});