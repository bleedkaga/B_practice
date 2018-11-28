var express = require('express')
var app = express();
var router = express.Router();
var cors = require('cors')
app.use(cors({credentials: true, origin: 'http://192.168.0.119:3000'}));
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', (req, res) => {
	console.log( req )
	res.end('starting root')
})
app.post('/test', (req, res) => {
	console.log( req)
	res.end(`starting`, )
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))