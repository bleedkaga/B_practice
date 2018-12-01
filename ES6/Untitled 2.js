//function getProcessedData( url ){
//	return downloadData(url)		//return a promise
//			.catch( e => {
//				return downloadFallbackData(url)
//			}).then(v => {
//				return processDataInWorker(v)
//			})
//}
//
//async function getProcessedData(url){
//	let v;
//	try {
//		v = await downloadData(url)
//	} catch(e) {
//		v = await downloadFallbackData(url)
//	}
//	
//	return processDataInWorker(v)
//}

async function timeout(){
	var out = await _out()
    
    return 10 + out
}

function _out(){
  	var s = 0;
	
	return new Promise( resolve => {
		setTimeout( () => {
				resolve(40)
		}, 1000)
	})  
}

var _s = timeout()

_s.then( res => {
console.log(res)})