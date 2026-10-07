const http = require('http')
fs = require('fs');

fs.readFileSync('./index.html');

const host = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {

    fs.readFile('./index.html', function (error, html) {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(html)
        res.end()
    });

})

server.listen(port, host, () => {
    console.log("servidor funcionando en", host, port)
});