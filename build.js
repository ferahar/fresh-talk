"use strict";
const stylus = require('stylus');
const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;
ncp.limit = 16;

const source = path.resolve(__dirname, 'src');
const destination = path.resolve(__dirname, 'dist');

// stylus(str)
//   .set('filename', 'build.css')
//   .render(function(err, css){
//   });      


ncp(source, destination, {
  filter: (source) => {
    if (fs.lstatSync(source).isDirectory()) {
      return true;
    } else {
      
      return source.match(/(.html|.css)/gmi) !== null;
    }
  }
}, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('file is done!');
});



