const request = require('request');
console.log(request)
// request('https://parkingpay.net/biuway/api/login/login', (error, response, body) => {
//   // console.log('error', error)
//   // console.log('response', response)
//   console.log('body', JSON.parse(body).msg)
// })

var options = {
  url: 'http://showdoc.palmtrends.com/index.php?s=/58&page_id=1474',
  headers: {
    'User-Agent': 'request'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log('==============================================================')
    console.log(info, 'info')
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
  }
}

request(options, callback);