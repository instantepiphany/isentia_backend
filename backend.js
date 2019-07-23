const http = require('http');
const https = require('https');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const requestURL = req.url;
  if (req.url.match(/^\/public$/)) {
    console.log('Public feed requested.');
    getFlickrPublicFeed().then(
      (feed) => res.end(JSON.stringify(feed))
    );
  } else if (req.url.match(/^\/public\?tags=.*/)) {
    console.log('Public feed with query requested.');
    const tags = require('url').parse(req.url, true).query.tags;
    getFlickrPublicFeed(tags).then(
      (feed) => {
        console.log("FEED:\n" + feed.toString());
        res.end(JSON.stringify(feed));
      }
    );
  } else {
    res.end('Request not handled:\n' + requestURL);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getFlickrPublicFeed(tags) {
  let Parser = require('rss-parser');
  let parser = new Parser();

  let feed;
  if (tags) {
    console.log(tags)
    feed = parser.parseURL(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${tags}`);
  } else {
    feed = parser.parseURL('https://api.flickr.com/services/feeds/photos_public.gne');
  }
  return feed;
}

