var arr=[8, 78, 92, 72, 22, 67, 48, 94, 53, 11, 34, 61, 53, 49, 15, 44, 57, 70, 59, 80, 60, 32, 47, 3, 55, 16, 46, 63, 56, 85, 27, 5, 7, 38, 86, 8, 74, 38, 55, 86, 27, 6, 98, 91, 78, 64, 36, 68, 39, 15, 45, 78, 36, 39, 87, 12, 18, 65, 42, 31, 65, 0, 3, 36, 10, 65, 15, 34, 9, 67, 62, 98, 85, 7, 54, 33, 23, 63, 92, 88, 84, 48, 10, 37, 70, 25, 28, 99, 7, 26, 77, 39, 56, 91, 61, 15, 87, 89, 95, 44]

// sort 1:
 function bubbleSort(arr){
	var len = arr.length;
	console.time('冒泡排序耗时:')
	for(var i = 0; i < len; i++){
		for(var j = 0; j < len - 1 - i; j++){
			if(arr[j] > arr[j + 1]){
				var temp = arr[j + 1]
				arr[j + 1] = arr[j]
				arr[j] = temp
			}
		}
	}
	console.timeEnd('冒泡排序耗时:')
	// return arr
}
bubbleSort(arr)

// sort 2:
function bubbleSort2(arr) {
	console.log(JSON.stringify(arr))
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
console.log(JSON.stringify(bubbleSort2(arr)))

// sort 3:
// function bubbleSort3(arr){
// 	var low = 0;
// 	var high = arr.length - 1; //设置变量的初始值
// 	var tmp, j;
// 	console.time('改进后冒泡排序耗时：2')
// 	while(low < high){
// 		for(j = low; j < high; ++j){
// 			if(arr[j] > arr[j + 1]){
// 				tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
// 			}
// 		}
// 		--high;
// 		for(j = high; j > low; --j){
// 			if(arr[j] < arr[j-1]){
// 				 tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
// 			}
// 		}
// 		++low
// 	}
// 	console.time('改进后冒泡排序耗时：2')
// }
function bubbleSort3(arr3) {
    var low = 0;
    var high= arr.length-1; //设置变量的初始值
    var tmp,j;
    console.time('2.改进后冒泡排序耗时');
    while (low < high) {
        for (j= low; j< high; ++j) //正向冒泡,找到最大者
            if (arr[j]> arr[j+1]) {
                tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        --high;                 //修改high值, 前移一位
        for (j=high; j>low; --j) //反向冒泡,找到最小者
            if (arr[j]<arr[j-1]) {
                tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
            }
        ++low;                  //修改low值,后移一位
    }
    console.timeEnd('2.改进后冒泡排序耗时');
}
bubbleSort3(arr)

function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    console.time('选择排序耗时');
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}
selectionSort(arr)

function insertionSort(array){
	if(Object.prototype.toString.call(array).slice(8, -1) === 'Array'){
		console.time('插入排序耗时:')
		for(var i = 1; i <array.length; i++){
			var key = array[i]
			var j = i - 1;
			while( j >= 0 && array[j] > key){
				array[j + 1] = array[j]
				j--
			}
			array[j + 1] = key
		}

		console.timeEnd('插入排序耗时:')
	}
}
insertionSort(arr)

// 改进插入排序： 查找插入位置时使用二分查找的方式
function binaryInsertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('二分插入排序耗时：');
        for (var i = 1; i < array.length; i++) {
            var key = array[i], left = 0, right = i - 1;
            while (left <= right) {
                var middle = parseInt((left + right) / 2);
                if (key < array[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (var j = i - 1; j >= left; j--) {
                array[j + 1] = array[j];
            }
            array[left] = key;
        }
        console.timeEnd('二分插入排序耗时：');
        return array;
    } else {
        return 'array is not an Array!';
    }
}
binaryInsertionSort(arr)


// 希尔排序（Shell Sort）
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while(gap < len/5) {          //动态定义间隔序列
        gap =gap*5+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}
shellSort(arr)

// 快速排序
function quick(arr) {
	console.time('快速排序耗时:')
	if (arr.length <= 1)
		return arr;
	var proiindex = Math.floor(arr.length / 2);
	var proift = arr.splice(proiindex, 1)[0]; //找基准，并把基准从原数组删除
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] <= proift) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	console.timeEnd('快速排序耗时:')
	// return quick(left).concat([proift], quick(right));

}

quick(arr)
