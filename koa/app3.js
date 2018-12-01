const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
	await next()
})

router.get('/', async (ctx, next) => {
	ctx.response.body = `
		<h1>Index</h1>
		<form action="/sign" method="post">
			<p>name: <input name="name" value="koa"></p>
			<p>password: <input name="password" type="password"></p>
			<p><input type="submit"></p>
		</form>
	`
})

router.post('/sign', async (ctx, next) => {
	var name = ctx.request.body.name || '',
			password = ctx.request.body.password || '';
	console.log(`signin with name : ${name}, password : ${password}`);

	if(name === 'koa' && password === '12345'){
		ctx.response.body = `<h1>Welcome , ${name}</h1>`
	} else {
		ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
	}
})

//由于middleware 的顺序很重要， 所以koa-bodyparser 必须在router之前被注册到app对象上
app.use(bodyParser())

app.use(router.routes())
app.listen(3000);
console.log('app started at port 3000...');