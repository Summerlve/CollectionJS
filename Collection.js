//Collection
;(function (window){
	var version = 0.10;
	// 原生函数
	var toString = Object.prototype.toString;
	var unshift = Array.prototype.unshift;
	var push = Array.prototype.push;
	
	// 通用函数
	var isObject = function (obj) {
		var type = typeof obj;
		return type === "object" && !!obj;
	};
	
	var isNumber = function (o) {
		return toString.call(o) === "[object Number]";
	}
		
	// Collection
	var Collection = function () {
		// 用于封装的原生数组。
		this.all = [];
	};

	Collection.prototype = {
		version: version,
		constructor: Collection,
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
				console.error("参数必需是数字");
				return ;
			} 
			
			// 是否越界
			var tempLength = this.all.length;
			if (index > -- tempLength) {
				console.error("数组越界");
				return ;
			}
			
			var cur = this.all[index]
			return cur ? cur : void 0;
		},
		remove: function (index) {
			// 检测是否为数字
			if (!isNumber(index)) {
				console.error("参数必需是数字");
				return ;
			}
			
			// 是否越界
			var tempLength = this.all.length;
			if (index > -- tempLength) {
				console.error("数组越界");
				return ;
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
	var Stack = function () {
		Collection.call(this);
	};

	Stack.prototype = new Collection();
	Stack.fn = Stack.prototype;
	Stack.fn.constructor = Stack;
	
	Stack.fn.push = function () {
		push.apply(this.all, arguments);
		return this;
	};
		
	Stack.fn.pop = function () {
		return this.all.pop();
	};
	
	
	// Queue
	var Queue = function () {
		Collection.call(this);
	};
	
	Queue.prototype = new Collection();
	Queue.fn = Queue.prototype;
	Queue.fn.constructor = Queue;
	
	Queue.fn.unshift = function () {
		unshift.apply(this.all, arguments);
		return this;	
	};
	
	Queue.fn.shift = function () {
		return this.all.shift();
	};
	
	
	// 映射成全局变量
	window.Collection = Collection;
	window.Stack = Stack;
	window.Queue = Queue;
}(window));