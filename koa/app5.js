const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./controller')
const nunjucks = require('nunjucks');

function createEnv(path, opts){
	var 
		autoescape = opts.autoescape === undefined ? true : opts.autoescape,
		noCache = opts.noCache || false,
		watch   = opts.watch || false,
		throwOnUndefined = opts.throwOnUndefined || false,
		env = new nunjucks.Environment(
				new nunjucks.FileSystemLoader('views', {
					noCache: noCache,
					watch: watch
				}), {
					autoescape: autoescape,
					throwOnUndefined: throwOnUndefined
				});

		if(opts.fileters){
			for(var f in opts.filters){
				env.addFilter(f, opts.filters[f])
			}
		}

		return env;
}

var env = createEnv('views', {
	watch: true,
	filters: {
		hex: function(n){
			return '0x'+n.toString(16)
		}
	}
})

var s = env.render('hello.html', {
	name: '<script>小明</script>'
})
console.log(s)
//由于middleware 的顺序很重要， 所以koa-bodyparser 必须在router之前被注册到app对象上
app.use(bodyParser())
app.use(controller('./controllers'))
app.listen(3000);
console.log('app started at port 3000...');