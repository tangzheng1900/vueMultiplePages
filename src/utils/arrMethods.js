/**
* 善行webapp常用方法
* @module 善行webapp常用方法
*/

/** 
* 数组方法
* @class 数组方法
*/


/**
 * 
 * @method arr_splice
 * @name 切割数组前n个元素
 * @param {Array} arr:需要切割的数组
 * @param {Number} n：切割前n个元素
 * @return {Array} arr:返回一个数组
 */

//数组切割
function arr_splice(arr,n){//arr:数组,n:切割前n个
	if(arr && arr.length>n){
		let new_arr=arr.splice(n);
		return new_arr;
	}else{
		return arr;
	}
};

export{
	arr_splice
}
