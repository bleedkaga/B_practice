var arr=[8, 78, 92, 72, 22, 67, 48, 94, 53, 11, 34, 61, 53, 49, 15, 44, 57, 70, 59, 80, 60, 32, 47, 3, 55, 16, 46, 63, 56, 85, 27, 5, 7, 38, 86, 8, 74, 38, 55, 86, 27, 6, 98, 91, 78, 64, 36, 68, 39, 15, 45, 78, 36, 39, 87, 12, 18, 65, 42, 31, 65, 0, 3, 36, 10, 65, 15, 34, 9, 67, 62, 98, 85, 7, 54, 33, 23, 63, 92, 88, 84, 48, 10, 37, 70, 25, 28, 99, 7, 26, 77, 39, 56, 91, 61, 15, 87, 89, 95, 44]


Array.prototype.removeDup = function(){
    console.time('数组去重耗时1:')
    var result = [this[0]];
    for(var i = 1 ; i<this.length; i++){
        var repeat = false;

        for(var j = 0; j<result.length;j++){
            if(this[i] === result[j]){
                repeat = true;
                break;
            }
        }
        if(!repeat){
            result.push(this[i]);
        }
    }
    console.timeEnd('数组去重耗时1:')
    return result;
}

function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++)
            if (arr[j]> arr[j+1]) {
                pos= j; //记录交换的位置
                var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        i= pos; //为下一趟排序作准备
     }
     console.timeEnd('改进后冒泡排序耗时');
     return arr;
}
console.log(JSON.stringify(bubbleSort2(arr.removeDup())))

function unique1(arr){
    var res = [arr[0]]
    for(var i = 1; i < arr.length; i++){
        var repeat = false;
        for(var j = 0;j < res.length; j++){
            if(arr[i] === res[j]){
                repeat = true;
                break;
            }
        }

        if(!repeat){
            res.push(arr[i])
        }
    }

    return res
}

console.log(unique1([1,1,2,3,5,3,1,5,6,7,4]));


function unique2(arr){
    console.time('unique2 耗时:')
    var arr2 = arr.sort((a, b) => a - b);
    var res = [arr[0]]
    for(var i = 1; i < arr.length; i++){
        if(arr2[i] !== res[res.length-1]){
            res.push(arr[i])
        }
    }
    console.timeEnd('unique2 耗时:')
    return res
}
var unique2Res = unique2(gernerate())

// 利用对象属性存在的特性，如果没有属性则存入新数组
function unique3(arr){
    var res = [];
    var obj = {};
    console.time('unique3 timeout:')
    for(var i = 0; i < arr.length; i++){
        if(!obj[arr[i]]){
            obj[arr[i]] = 1;
            res.push(arr[i])
        }
    }
    console.timeEnd('unique3 timeout:')
    return res;
}
var unique3Res = unique3(gernerate())

// 利用数组的indexOf下标属性来查询
function unique4(arr){
    var res = [];
    console.time('unique4 timeout:')
    for(var i = 0; i < arr.length; i++){
        if(res.indexOf(arr[i]) == -1){
            res.push(arr[i])
        }
    }
    console.timeEnd('unique4 timeout:')
    return res;
}
// var unique4Res = unique4(gernerate()) //性能极差


function unique5(arr){
 var res = [];
    console.time('unique5 timeout:')
 for(var i=0; i<arr.length; i++){
  if( !res.includes(arr[i]) ){ // 如果res新数组包含当前循环item
   res.push(arr[i]);
  }
 }
 console.timeEnd('unique5 timeout:')
 return res;
}
// var unique5Res = unique5(gernerate()) //性能极差

function gernerate(){
    var r = []
    for(var i = 0; i < 3000000; i++){
        r.push(Math.round(Math.random()*10000))
    }
    return r
}
