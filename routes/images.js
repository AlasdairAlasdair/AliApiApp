var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');

router.get('/', function(req, res, next) {

  var reqUrl = url.parse(req.url, true);
  var subRedditName = '/r/' + reqUrl.query.sub;
  var picsCount = reqUrl.query.picsCount;

  var apiPath = subRedditName + '/top.json?limit=' + picsCount;

  var options = {
    host: 'www.reddit.com',
    path: apiPath
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

      res.render('images', { title: subRedditName, pageData : pageData });
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