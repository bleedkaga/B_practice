const fs = require('fs')
const http = require('http')
const url  = require('url')

const server = http.createServer();
server.listen(3000)
server.on('request', (req, res) => {
    console.log(req)
    var urlObj = url.parse(req.url)
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    for(let i in urlObj){
        res.write(`<h1 style="font-weight: normal">${i}: ${ JSON.stringify(urlObj[i]) }</h1>`)
    }
   
    if(urlObj.pathname == '/register.html'){
        fs.readFile('./register.html', (err, data) => {
            if(err) throw err;
            console.log(data)
            res.end(data)
        })
    } else if( urlObj.pathname == '/register.do'){
        const query = urlObj.query;

        var uname = query.uname;
        var upwd  = query.upwd
        var data = `username : ${uname}, user_password : ${ upwd }, time: ${Date.now()}'\r\n`

        fs.appendFile('./user.log', data, (err, data) => {
            if(err) throw Error(`[append file]: fail ${err}`);
            res.end('注册成功')
        })

    } else {
        res.statusCode = 404;
        res.end(`<b>您请求的资源不存在</b>`)
    }

    // res.end()
})