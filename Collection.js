"use strict"
//Collection
;(function (window){
	var version = 0.11;
		
	// 原生函数的原型对象
	var ArrayProto = Array.prototype;
	var ObjProto = Object.prototype;
	
	// 原生函数
	var toString = ObjProto.toString;
	var unshift = ArrayProto.unshift;
	var push = ArrayProto.push;
	
	// 通用函数
	function isObject (o) {
		var type = typeof o;
		return type === "object" && !!o;
	}
	
	function isNumber (o) {
		return toString.call(o) === "[object Number]";
	}
	
	function isString (o) {
		return toString.call(o) === "[object String]"
	}
	
		
	// 用于全局搜索数据结构，和tag搭配，Stack与Queue共用
	function Lib () {
		this.store =  [];
	}
	
	Lib.prototype = {
		constructor: Lib,
		add: function (o) {
			// tag不能重复。
			var isExist = false;
			this.store.filter(function (cur, index, array) {
				if (cur.tag === o.tag) isExist = true;
			});
			
			if (isExist) {
				throw "tag重复";
			} else {
				this.store.push(o);	
			}
		},
		where: function (tag) {
			var result = this.store.filter(function (cur, index, arr) {
				if (cur.tag === tag) {
					return cur;
				}
			});
			return result[0];
		}
	};
	
	// Collection
	function Collection (tag) {
		// 用于封装的原生数组。
		this.all = [];
		this.tag = tag;
	}

	Collection.prototype = {
		version: version,
		constructor: Collection,
		/*
		extend: function (obj) {
			if (!isObject(obj)) return ;
			
			var key;
			for (key in obj) {
				if (obj.hasOwnProperty(key) && !(key in this)) {
					this[key] = obj[key];
				}
			}
			
			return this;
		},
		*/
		tag: "", // 用于全局搜索数据结构，必须是字符串，不能重复。
		display: function () {
			// just for test			
			console.log(this.all);	
		},
		// Traverse Method
		each: function (fn) {
			// fn (currentValue, index)，this = currentValue
			this.all.forEach(function (currentValue, index) {
				// 屏蔽forEach回调函数的第三个参数array
				fn.call(currentValue, currentValue, index);
			});
			return this;
		},
		map: function (fn) {
			var result = [];
			// fn (currentValue, index)，this = currentValue
			this.all.forEach(function (currentValue, index) {
				// 屏蔽forEach回调函数的第三个参数array
				result.push(fn.call(currentValue, currentValue, index));
			});
			return result;
		},
		// General Method
		get: function (index) {
			// 检测是否为数字
			if (!isNumber(index)) {
				throw "get()的参数必需是数字";
			} 
			
			// 是否越界
			var tempLength = this.all.length;
			if (index > -- tempLength) {
				throw "数组越界";
			}
			
			var cur = this.all[index]
			return cur ? cur : void 0;
		},
		remove: function (index) {
			// 检测是否为数字
			if (!isNumber(index)) {
				throw "remove()的参数必需是数字";
			}
			
			// 是否越界
			var tempLength = this.all.length;
			if (index > -- tempLength) {
				throw "数组越界";
			}
			
			// 删除
			this.all.splice(index, 1);
			return this;
		},
		length: function () {
			return this.all.length;
		},
		empty: function () {
			this.all.length = 0;
			return this;
		},
		toArray: function () {
			// return a Array copy
			return this.all.slice();	
		},
		first: function () {
			var first = this.all[0];
			return first ? first : void 0;
		},
		last: function () {
			var last = this.all[this.all.length - 1]
			return last ? last : void 0;
		}
	};
	
	// Stack 
	function Stack (tag) {
		if (!isString(tag)) throw "tag必须是字符串";
		Collection.call(this, tag);
		Stack.lib.add(this);
	}

	Stack.lib = new Lib();
	
	Stack.prototype = new Collection();
	var StackProto = Stack.prototype;
	StackProto.constructor = Stack;
	
	StackProto.push = function () {
		push.apply(this.all, arguments);
		return this;
	};
		
	StackProto.pop = function () {
		return this.all.pop();
	};
	
	
	// Queue
	function Queue (tag) {
		Collection.call(this, tag);
		Queue.lib.add(this);
	}
	
	Queue.lib = new Lib();
	
	Queue.prototype = new Collection();
	var QueueProto = Queue.prototype;
	QueueProto.constructor = Queue;
	
	QueueProto.unshift = function () {
		unshift.apply(this.all, arguments);
		return this;	
	};
	
	QueueProto.shift = function () {
		return this.all.shift();
	};
	
	// 映射成全局变量
	window.Collection = Collection;
	window.Stack = Stack;
	window.Queue = Queue;
}(window));