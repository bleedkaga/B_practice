function resolveAfter2Seconds(x){
	return new Promise( resolve => {
		setTimeout( () => {
			resolve(x)
		},1000)
	})
}

async function add1(x){
	const a = await resolveAfter2Seconds(20);
	const b = await resolveAfter2Seconds(30);
	
	//计时器异步运行
	return x + a + b
}

add1(10).then( v => {
	console.log(v)
})

async function add2(x){
	const p_a = resolveAfter2Seconds(20);
	const p_b = resolveAfter2Seconds(30);
	
	//计时器并发运行
	return x + await p_a + await p_b;
}

add2(10).then( v => {
	console.log(v)
})