const fileSystem = require("fs");
const http = require("http");
const url = require("url");

http.createServer(function (req, res) {
    // Get the requested url
    const myUrl = url.parse(req.url, true);
   
    // Translate url to corresponding filename
    let fileName; 
    if (myUrl.pathname === "/"){
        fileName = "./index.html";
    } else {
        fileName = "." + myUrl.pathname + ".html";
    }
    
    // Read and return corresponding file
    fileSystem.readFile(fileName, function(error, data) {
        if (error) {
            fileSystem.readFile("./404.html", function(notFoundError, notFoundData) {
                res.writeHead(404, {"Content-Type": "text/html"});
                res.write(notFoundData);
                return res.end();
            });
        } else {
            res.writeHead(200, {"Content-Type": "text/html"})
            res.write(data);
            return res.end();
        }
    })
}).listen(3000);
