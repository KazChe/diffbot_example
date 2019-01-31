// var Diffbot = require('diffbot').Diffbot
var Diffbot = require('./mylib/diffbot').Diffbot

var diffbot = new Diffbot('0603ef8b180d4541424e2f4e3471058a'); // your API key here

// regular function
diffbot.article({uri: 'http://techcrunch.com/2011/09/07/nintendo-gets-sued-over-the-wii/'}, function(err, response) {
  if(response.objects[0] !== undefined) {
      console.log(response.objects[0].title);
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
diffbot.frontpage({uri: 'https://serverless.com//'}, function(err, response) {
    console.dir(response.request.api)
    for(const prop in response.sections) {
        const items = response.sections[prop].items
        //console.log(items)
        for(const prop in items) {
            const item = items[prop]
            console.log('title:',item.title, 'url:', item.url)
        }
    }


    // the frontpage api is weird right now
  // the json return isn't really json...
  // it looks like xml converted to json
  // need to incorporate an xml parser to this
});

diffbot.discussion({uri: 'https://news.ycombinator.com/item?id=5608988'}, function(err, response) {
    console.dir(response)
    if(response.objects[0] !== undefined) {
        let responseObject = {}
        responseObject = response.objects[0]
        console.log('DISCUSSION | confidence:',responseObject.confidence)
        console.log('DISCUSSION | page url:',responseObject.pageUrl)
        console.log('DISCUSSION | title:',responseObject.title)
        console.log('DISCUSSION | tags:',responseObject.tags)
        console.log('DISCUSSION | author:',responseObject.author)
    }
});

diffbot.image({uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fs3-eu-west-1.amazonaws.com%2Fwizardondemand%2Fserverless%2Fserverless-1-with-technology-names.png&imgrefurl=https%3A%2F%2Fserverless.com%2Fblog%2Funit-testing-nodejs-serverless-jest%2F&docid=X4tk3aw3qWU_BM&tbnid=kIqjmP4Va6WnoM%3A&vet=10ahUKEwiEoYTu6ZjgAhWjrFQKHSGKA4sQMwhEKAQwBA..i&w=1200&h=500&bih=594&biw=1280&q=serverless%20framework&ved=0ahUKEwiEoYTu6ZjgAhWjrFQKHSGKA4sQMwhEKAQwBA&iact=mrc&uact=8'}, function(err, response) {
    console.log('API Called:',response.request.api, '|| URL:',response.request.pageUrl)
    for(const index in response.objects) {
        const value = response.objects[index]
        console.log(index,value)
    }
});