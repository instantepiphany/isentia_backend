var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var backend = require('./backend');
var getFlickrPublicFeed = backend.getFlickrPublicFeed;

describe('getFlickrPublicFeed', function() {
  it('getFlickrPublicFeed should call the Flickr API and get { items: [...] }', function(done) {
    getFlickrPublicFeed().then((feed) => {
      expect(feed.items).to.be.a('array');
      done();
    });
  });
});
