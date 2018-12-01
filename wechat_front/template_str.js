// destnation
/*
    var obh = { name: '二月', age: '15'}
    var str = "{{name}}很厉害，才{{age}}岁"

    output: 二月很厉害，才15岁
*/

// method1:
let str = "{{name}}很厉害，才{{age}}岁"
let obj = {name: '二月', age: 15}

function test(str, obj){
    let _s = str.replace(/\{\{(\w+)\}\}/g, '$1')
    let result
    for(let k in obj){
        _s = _s.replace(new RegExp(k, 'g'), obj[k])
    }
    return _s
}

const s = test(str, obj)
console.log('method 1 :', s)

// method 2:
function parseString(str, obj){
    Object.keys(obj).forEach( key => {
        str = str.replace(new RegExp(`{{${key}}}`, 'g'), obj[key])
    })
    return str
}

console.log('method 2:', parseString(str, obj))

// method 3
function render(template, context) {
    return template.replace(/\{\{(.*?)\}\}/g, (match, key) => context[key]);
  }
  const template = "{{name}}很厉name害，才{{age}}岁";
  const context = { name: "jawil", age: "15" };
  console.log('method 3:', render(template, context));

// method 4
String.prototype.render = function(context) {
    return this.replace(/{{(.*?)}}/g, (match, key) => context[key.trim()])
}

console.log("method 4:","{{name}}很厉name害，才{{ a1ge }}岁".render({ name: "jawil", a1ge: "15" }))