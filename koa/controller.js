const fs = require('fs');

function addMapping(router, mapping){
	for(var url in mapping){
		if(url.startsWith('GET')){
			var path = url.substring(4);

			router.get(path, mapping[url])
			console.log(`register URL mapping: GET ${path}`)
		} else if(url.startsWith('POST')){
			var path = url.substring(5);
			router.post(path, mapping[url])
		} else {
			
			console.log(`invalid url : ${url}`)
		}
	}
}

function addControllers( router ){
	var files = fs.readdirSync(__dirname + '/controllers');

	var js_file = files.filter( f => f.endsWith('.js'));

	for(var f of js_file){
		console.log(`Process controller: ${f}...`);
		let mapping = require(__dirname + '/controllers/' + f);
		addMapping(router, mapping)
	}
}

module.exports = dir => {
	console.log('dir', dir)
	let controllers_dir = dir || 'controllers',
			router = require('koa-router')();

	addControllers(router, controllers_dir)

	return router.routes()
}