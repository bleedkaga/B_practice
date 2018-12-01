const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default;
const { transformFromAst} = require('babel-core');

let ID = 0;

function createAsset( filename ){
    // 读取文件内容
    const content = fs.readFileSync(filename, 'utf-8')

    // 转化成AST
    const ast = babylon.parse(content, {
        sourceType: 'module'
    })

    // 该文件的所有依赖
    const dependencies = [];

    // 获取依赖声明
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value)
        }
    })

    // 转化ES6语法到ES5
    const { code } = transformFromAst(ast, null, {
        presets: ['env']
    })

    // 分配ID
    const id = ID++;

    // 返回这个模块
    return {
        id,
        filename,
        dependencies,
        code
    }
}

// console.log( createAsset('./entry.js'))
function createGragh( entry ){
    // 解析传入的文件为模块
    const mainAsset = createAsset( entry );

    // 维护一个数组，传入第一个模块
    const queue = [ mainAsset ];

    // 遍历数组，分析每一个模块是否还有其它依赖，若有则把模块推进数组
    for(const asset of queue){
        asset.mapping = {};
        // 由于依赖的路径是相对于当前的模块，所以要把相对路径都处理为绝对路径
        const dirname = path.dirname(asset.filename);

        // 遍历当前的模块并继续依赖其分析
        asset.dependencies.forEach( relativePath => {
            // 构造绝对路径
            const absolutePath = path.join(dirname, relativePath);

            // 生成依赖模块
            const child = createAsset(absolutePath);

            // 把依赖关系写入到模块当中
            asset.mapping[relativePath] = child.id;

            // 把这个依赖模块也推入到queue数组中， 以便继续对其进行依赖分析
            queue.push( child )
        })

    }

    return queue;
}

const rest = createGragh('./entry.js');

// console.log( rest )
function bundle( gragh ){
    let modules = '';

    gragh.forEach( mod => {
        modules += `${mod.id} : [
            function(require, module, exports) {
                ${ mod.code }, ${JSON.stringify(mod.mapping)}
            }
        ],`
    })

    const result = `
        (function(modules){
            function require(id){
                const [fn, mapping] = modules[id];

                function localRequire( name ){
                    return require( mapping[name])
                }

                const module = { exports : {} };

                fn(localRequire, module, module.exports);

                return module.exports
            }

            require(0)
        })({${modules}})
    `

    return result;
}


const bundleResult = bundle(createGragh('./entry.js'))

console.log( bundleResult )


