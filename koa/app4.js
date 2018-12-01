const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const fs = require('fs');

// var files = fs.readdirSync(__dirname + '/controllers');

// //过滤输.js 文件
// var js_files = files.filter( f => f.endsWith('.js'));

// for(var f of js_files){
// 	console.log(`Process controller：${f}...`);

// 	//导入js 文件
// 	let mapping = require(__dirname + '/controllers/'+f);
// 	for(var url in mapping){
// 		if(url.startsWith('GET')){
// 			//如果URL 类似 'GET xxx';
// 			var path = url.substring(4);
// 			router.get(path, mapping[url])
// 			console.log(`register URL mapping: GET ${path}`)
// 		} else if(url.startsWith('POST')){
// 			//如果URL 类似 'POST xxx';
// 			var path = url.substring(5);
// 			router.post(path, mapping[url])
// 			console.log(`register URL mapping: POST ${path}`);
// 		} else {
// 			//无效的URL
// 			console.log(`invalid URL: ${url}`);
// 		}
// 	}
// }

funciton addMapping(router, mapping){
	for(var url in mapping){
		if(url.startsWith('GET')){
			var path = url.substring(4);

			router.get(path, mapping[url])
			console.log(`register URL mapping: GET{$path}`)
		} else if(url.endsWith('POST')){
			var path = url.substring(5);
			router.post(path, mapping[url])
		} else {
			console.log(`invalid url : ${url}`)
		}
	}
}

function addControllers( router ){
	var files = rs.readdirSync(__dirname + '/controllers');

	var js_file = files.filter( f => f.endsWith('.js'));

	for(var f of js_file){
		console.log(`Process controller: ${f}...`);
		let mapping = require(__dirname + '/controllers/' + f);
		addMapping(router, mapping)
	}
}

//由于middleware 的顺序很重要， 所以koa-bodyparser 必须在router之前被注册到app对象上
app.use(bodyParser())

app.use(router.routes())
app.listen(3000);
console.log('app started at port 3000...');