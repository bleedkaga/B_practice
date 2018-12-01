const assert = require('assert')
const hello = require('../async-test')

// 使用同步测试的方式
// it('#async function', async () => {
//     let r = await hello();
//     assert.strictEqual(r, 15);
// });

// 对于用ES7的async 编写的函数， 我们可以这么写
it('#async with done', done => {
	(async () => {
		try{
			let r = await hello();
			assert.strictEqual(r, 15)
			done()
		} catch(err){
			done(err)
		}
	})()
} )

// 如果要测试一个异步函数， 我们要传入的函数需要带一个参数， 通常命名为 done;
// it('test async function', function (done) {
//     fs.readFile('filepath', function (err, data) {
//         if (err) {
//             done(err);
//         } else {
//             done();
//         }
//     });
// });