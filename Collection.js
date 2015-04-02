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
	var COLLECTION = function () {
		// 用于封装的原生数组。
		this.all = [];
	};

	COLLECTION.prototype = {
		version: version,
		constructor: COLLECTION,
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
			// fn (currentValue, index)
			this.all.forEach(function (currentValue, index) {
				fn.apply(currentValue, [currentValue, index]);
			});
			return this;
		},
		map: function (fn) {
			var result = [];
			// fn (currentValue, index)
			this.all.forEach(function (currentValue, index) {
				result.push(fn.apply(currentValue, [currentValue, index]));
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
	var STACK = function () {
		COLLECTION.call(this);
	};

	STACK.prototype = new COLLECTION();
	STACK.fn = STACK.prototype;
	STACK.fn.constructor = STACK;
	
	STACK.fn.push = function () {
		push.apply(this.all, arguments);
		return this;
	};
		
	STACK.fn.pop = function () {
		return this.all.pop();
	};
	
	
	// Queue
	var QUEUE = function () {
		COLLECTION.call(this);
	};
	
	QUEUE.prototype = new COLLECTION();
	QUEUE.fn = QUEUE.prototype;
	QUEUE.fn.constructor = QUEUE;
	
	QUEUE.fn.unshift = function () {
		unshift.apply(this.all, arguments);
		return this;	
	};
	
	QUEUE.fn.shift = function () {
		return this.all.shift();
	};
	
	
	// 映射成全局变量
	window.COLLECTION = COLLECTION;
	window.STACK = STACK;
	window.QUEUE = QUEUE;
}(window));