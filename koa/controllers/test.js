var fn_test = async (ctx, next) => {
	ctx.response.body = '<h1>Test Page</h1>'
}

module.exports = {
	'GET /test': fn_test
}