import Library from './library';

if(module.hot){
	module.hot.accpet('./library', function(){
		console.log('Accpeting the updated library module!')
		Library.log()
	})
}