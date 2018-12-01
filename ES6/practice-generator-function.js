var iterator = getArticales('dummy.json');

//开始执行
iterator.next();

//异步任务模型
function getData( src ){
	setTimeout( function(){
		iterator.next({tpl: 'tpl.html', name: 'fsjohnhuang'})
	}, 1000)
}

function getTpl( tpl ){
	setTimeout(function(){
		iterator.next('hello ${name}')
	}, 1000)
}
function getCustom( tpl ){
	setTimeout(function(){
		iterator.next( tpl )
	}, 1000)
}


//同步任务
function render( data, tpl, custom){
	return tpl.replace(/\$\{(\w+)\}/, function(){
//		return data[arguments[1]] == void 0 ? arguments[0] : data[arguments[1]]
		var html = '';
		for(var i = 0; i < arguments.length; i++){
			html += arguments[i]
		}
		return html
	})
}


function *getArticales( src ){
	console.log('begin');
	
	var data = yield getData(src);
	var tpl = yield getTpl(data.tpl);
	var custom = yield getCustom(tpl)
	
	var res = render(data, tpl, custom)
	
	console.log(res)
}