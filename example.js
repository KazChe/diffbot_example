var Diffbot = require('diffbot').Diffbot

var diffbot = new Diffbot('0603ef8b180d4541424e2f4e3471058a'); // your API key here

// regular function
diffbot.article({uri: 'http://techcrunch.com/2011/09/07/nintendo-gets-sued-over-the-wii/'}, function(err, response) {
  if(response.objects[0] !== undefined) {
      console.log('WTF?', response.objects[0].title);
      console.log(response.objects[0].text);
      if (response.objects[0].media)
          console.log(JSON.stringify(response.objects[0].media));
  }
});

// and a dash of cayenne... some addins
diffbot.article({uri: 'https://www.vanityfair.com/news/2019/01/roger-stone-arrested-indicted-in-mueller-probe', html: true, comments: true, stats: true}, function(err, response) {
  console.log(response.stats.times.preparation.fetch);
  console.log(response.stats.confidence);
  console.log(response.objects[0].html);
});

// maybe try the frontpage api too
diffbot.frontpage({uri: 'http://prettyspace.tumblr.com/'}, function(err, response) {
  console.dir(response)
  // the frontpage api is weird right now
  // the json return isn't really json...
  // it looks like xml converted to json
  // need to incorporate an xml parser to this
});
