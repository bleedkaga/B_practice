var fn_index = async (ctx, next) => {
	ctx.response.body = `
		<h1>Index</h1>
		<form action="/sign" method="post">
			<p>name: <input name="name" value="koa"></p>
			<p>password: <input name="password" type="password"></p>
			<p><input type="submit"></p>
		</form>
	`
}

var fn_signin = async (ctx, next) => {
	var name = ctx.request.body.name || '',
			password = ctx.request.body.password || '';
	console.log(`signin with name : ${name}, password : ${password}`);

	if(name === 'koa' && password === '12345'){
		ctx.response.body = `<h1>Welcome , ${name}</h1>`
	} else {
		ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
	}
}

module.exports = {
	'GET /': fn_index,
	'POST /sign': fn_signin
}