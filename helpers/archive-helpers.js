var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var stream = fs.createReadStream("../web/archives/sites.txt");
  var data = "";
  stream.on("data", function(chunk) {
    callback(chunk);
  });
};

exports.isUrlInList = function(data){
  fs.readdir("../web/archives/sites", function(err, files) {
    files.forEach(function(file) {
      if (file === data) {
        //serve it
        console.log('its in there');
        console.log(this);
        return true;
      }else{
        // archive.downloadUrls();
        console.log('its not there');
        return false;
      }

    });
  });
};

exports.addUrlToList = function(){
};

exports.isUrlArchived = function(){
};

exports.downloadUrls = function(chunk){
  request('http://' + chunk).pipe(fs.createWriteStream('./archives/sites/' + chunk));
};
