const http = require('http')

const host='127.0.0.1'
const port=3000

const server=http.createServer((req,res) => {
res.writeHead(200,{'content-type':'text/plane'})
res.write("Hola desde el servidor")
res.end()
})

server.listen(port,host,()=>{
    console.log("servidor funcionando en",host,port)
});