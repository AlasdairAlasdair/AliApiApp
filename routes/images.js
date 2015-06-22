var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {

  var options = {
    host: 'www.reddit.com',
    path: '/r/aww/top.json?limit=28'
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
        pageData.push(GetRelevantBitsFromPost(posts[i]));
      };

      res.render('images', { title: '/r/aww', pageData : pageData });
    });
  }
  http.request(options, callback).end();
});

function GetRelevantBitsFromPost(post){
  // TODO: sources needs some sanitising:
  // imgur.com/c9gRkrB => i.imgur.com/c9gRkrB.jpg
  return {
          title : post.data.title,
          source : post.data.url,
          thumbnail : post.data.thumbnail
        };
}

module.exports = router;