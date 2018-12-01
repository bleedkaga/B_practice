// 浮点数取整
var x = 123.456
console.log('浮点数取整 method 1:', x >> 0)
console.log('浮点数取整 method 2:', ~~x)
console.log('浮点数取整 method 3:', x | 0)
console.log('浮点数取整 method 4:', Math.floor(x))

// =========================================================================

// 生成6位数字验证码
console.log('生成6位数字验证码 method 1:', function(){
    return ('000000'+Math.floor(Math.random() * 999999)).slice(-6)
}())

console.log('生成6位数字验证码 method 2:', function(){
    return Math.random().toString().slice(-6);
}())

console.log('生成6位数字验证码 method 3:', function(){
    return Math.random().toFixed(6).slice(-6);
}())

console.log('生成6位数字验证码 method 4:', function(){
    return ''+ Math.floor(Math.random() * 999999);
}())


// =========================================================================
// 16进制颜色代码生成


var interval = setInterval(function(){
    var color = (function(){
        return '#'+('00000' + (Math.random() * 0x1000000).toString()).slice(-6)
    })()
    console.log('16进制颜色代码生成', color)
}, 30)

setTimeout(()=>{
    clearInterval(interval)
}, 5000)


// url查询参数转json格式
// ES6
var query = (search = '') => ((querystring = '') => (q => (querystring.split('&').forEach(item => (kv => kv[0] && (q[kv[0]] = kv[1]))(item.split('='))), q))({}))(search.split('?')[1]);

// ES5
var query = function(search) {
  if (search === void
 0) { search = ''; }
  return (function(querystring) {
    if (querystring === void
 0) { querystring = ''; }
    return (function(q) {
      return (querystring.split('&').forEach(function(item) {
        return (function(kv) {
          return kv[0] && (q[kv[0]] = kv[1]);        
        })
    (item.split('='));      
}), q);    })({});  })(search.split('?')[1]);};
