var http = require("http");// require module file system
var fs = require("fs");var port = 120, host = '127.0.0.1';// create server
var server = http.createServer(function(request, response){
// get file request
var urlRequest = request.url;
console.log("Received request: " + urlRequest);

// file path
var filePath = "./public" + urlRequest;

// read file
fs.readFile(filePath, function(error, data){

// has error
if(error){

response.writeHead(400, {"Content-type": "text/plain"});
response.end("Sorry, The page not found");
}

// response data for client
else{

response.writeHead(200, {"Content-type": "text/html"});
response.write(data);
response.end();
}

});

});

// open port and listen client
server.listen(port, host, function(){

var address = server.address();
console.log("opened server on %j", address);
});