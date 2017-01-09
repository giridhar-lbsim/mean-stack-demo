/*var winston = require('winston');
require('winston-loggly-bulk');
 
 winston.add(winston.transports.Loggly, {
    token: "9eb034c2-3b34-44d7-857f-aae18e97fd7a",
    subdomain: "nuospin1",
    tags: ["Winston-NodeJS"],
    json:true
});

winston.log('info',"Hello World from Node.js!");*/

var winston = require('winston');
require('winston-loggly-bulk');

module.exports = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)(),
    new(winston.transports.File)({
      filename: './restserver.log'
    }),
    new(winston.transports.Loggly)({
      //anurag's token 
      // token: "3edbde74-ed6d-4635-b79c-5972752d6410",
      // subdomain: "nuospin",
      
      //my token
      token: "9eb034c2-3b34-44d7-857f-aae18e97fd7a",
      subdomain: "nuospin1",
      tags: ["Winston-NodeJS"],
      json: true
    })
  ]
});