//Collection
;(function (window){
	var version = 0.02;

	// 通用函数
	var isObject = function (obj) {
		var type = typeof obj;
		return type === "object" && !!obj;
	};
	
	// Collection的主体
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
		// Stack Method
		push: function (o) {
			this.all.push(o);
			return this;
		},
		add: function (o) {
			// add is alias of push
			this.push(o);
			return this;
		},
		pop: function () {
			return this.all.pop();
		},
		// Queue Method
		unshift: function (o) {
			this.all.unshift(o);
			return this;	
		},
		shift: function () {
			return this.all.shift();
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
			if (typeof index !== "number") {
				console.log("参数必需是数字");
				return ;
			} 
			
			// 是否越界
			var tempLength = this.all.length;
			if (index > -- tempLength) {
				console.log("数组越界");
				return ;
			}
			
			var cur = this.all[index]
			return cur ? cur : void 0;
		},
		del: function (index) {
			// 检测是否为数字
			if (typeof index !== "number") {
				console.log("参数必需是数字");
				return ;
			}
			
			// 是否越界
			var tempLength = this.all.length;
			if (index > -- tempLength) {
				console.log("数组越界");
				return ;
			}
			
			// 删除
			this.all.splice(index, 1);
			return this;
		},
		remove: function (index) {
			// remove is alias of del
			this.del(index);
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
		
	// 映射成全局变量
	window.Collection = Collection;
}(window));