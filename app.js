const http = require('http');
const fs = require('fs');
const assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

const hostname = '127.0.0.1';
const port = 8080;

const pw = "Password goes here"
const dbUrl = "mongodb+srv://326-admin:" + pw + "@movietime-kuraq.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "MovieTimeDB"

MongoClient.connect(dbUrl, {useUnifiedTopology: true}, function(err, client) {
     assert.equal(null, err);
     console.log("Connected successfully to database");
   
     const db = client.db(dbName);
   
     client.close();
});

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
