const server = require('./app');

server.listen(8080/*process.env.MLAB*/, function() {
    console.log('Server is listening on http://localhost:8080');
});
