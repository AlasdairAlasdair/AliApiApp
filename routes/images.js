var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {

  var options = {
    host: 'www.reddit.com',
    path: '/r/aww/top.json'
  };

  callback = function(response) {  

    var apiDataString = '';

    // append chunks to apiDataString while there's still data.
    response.on('data', function (chunk) {
      apiDataString += chunk;
    });

    // the whole response has been recieved
    response.on('end', function () {
      var apiData = JSON.parse(apiDataString);

      var posts = apiData.data.children;

      var pageData = [];

      for (var i = 0; i < posts.length; i++) {
        var url = posts[i].data.url;
        pageData.push(url);
      };

      res.render('images', { title: 'images!', pageData : pageData});
    });
  }

  http.request(options, callback).end();

});

module.exports = router;