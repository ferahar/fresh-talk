"use strict";
const fs = require('fs')
const path = require('path')
const ncp = require('ncp').ncp;
ncp.limit = 16;

const source = path.resolve(__dirname, 'src')
const destination = path.resolve(__dirname, 'dist')
 
ncp(source, destination, {
  filter: (source) => {
    if (fs.lstatSync(source).isDirectory()) {
      return true;
    } else {
      return source.match(/(.html|.css)/gmi)!== null
    }
    return false
  }
}, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('file is done!');
});