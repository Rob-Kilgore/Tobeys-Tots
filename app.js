const http = require('http');
const fs = require('fs');
const assert = require('assert');
const dbInterface = require('./js/dbInterface');

var MongoClient = require('mongodb').MongoClient;
//var mongoose = require("mongoose");

const hostname = '127.0.0.1';
const port = 8080;


var pw;
try {
     pw = extractPassword(process.argv);
}
catch(err) {
     console.log("Error: " + err);
     process.exit(1);
}

const dbName = "MovieTimeDB";
const dbUrl = "mongodb+srv://326-admin:" + pw + "@movietime-kuraq.mongodb.net/" + dbName + "?retryWrites=true&w=majority";///" + dbName;

try
{
     dbInterface.connect(dbUrl);
}
catch(err) {
     console.log(err);
     process.exit(1);
}



fs.readFile('webdir//index.html', (error, html) => {
     if(error) {
          throw error;
     }
     const server = http.createServer((req, res) => {
          res.statusCode = 200;
          res.setHeader('Content-type', 'text/html');
          res.write(html);
          res.end();
     });

     server.listen(port, hostname, () => {
          console.log('server started on port ' + port);
     });
});

function extractPassword(argv) {
     var pw = null;
     argv.forEach(function(str)
     {
          if(str.substring(0, 3) === "pw:")
          {
               pw = str.substring(3);
          }
     });
     if(pw == null)
     {
          throw "Password argument not specified. Specify password using pw:[PASSWORD]";
     }
     return pw;
}
