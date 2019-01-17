var express = require("express");
var myParser = require("body-parser");
var app = express();
var fs = require('fs')


app.use(myParser.json({extended : true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  console.log('GET / by'+req.headers.host)
 res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks for hitting node server');

    
});
 
app.use(myParser.urlencoded({extended : true}));


app.post('/', function(req, res){
console.log(req.headers.host)
    console.log('POST /');

    console.dir(req.body);
   var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;

var client = new Client('localhost:2181', 'my-client-id', {
  sessionTimeout: 300,
  spinDelay: 100,
  retries: 2
});

client.on('error', function(error) {
  console.error(error);
});

var producer = new HighLevelProducer(client);

producer.on('ready', function() {
  // Create message and encode to Avro buffer
  

  // Create a new payload
  var payload = [{
    topic: 'neova',
    messages: JSON.stringify(req.body),
     /* Use GZip compression for the payload */
  }];

  //Send payload to Kafka and log result/error
  producer.send(payload, function(error, result) {
    console.info('Sent payload to Kafka: ', payload);
    if (error) {
      console.error(error);
    } else {
      var formattedResult = result[0];
      console.log('result: ', result)
    }
  });
});

// For this demo we just log producer errors to the console.
producer.on('error', function(error) {
  console.error(error);
});

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');


});
app.listen(3000);
