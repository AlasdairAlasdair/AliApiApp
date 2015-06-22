#AliApiApp

Simple NodeJS app that grabs the top posts from some SubReddits and displays the post's thumbnail image and links to the source. There's no real error handling or tests and it can't handle posts that don't have a thumbnail. Gets an arbitrary number of images (28) purely because that looked alright for my screen size. Works in Chrome and Firefox. It gets Bootstrap and JQuery from their CDNs since it won't work without internet access anyway.

You can set the port it runs on using the environment variable NODE_APP_PORT but it defaults to 3000.

To run:
$ npm install
$ nodemon app