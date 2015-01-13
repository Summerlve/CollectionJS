;(function (window){
	// 常用函数
	var isObject = function (obj) {
		var type = typeof obj;
		return type === "object" && !!obj;
	};
	
	// $ is jQuery
	var $ = window.jQuery || window.$;
	
	// init 初始化函数
	var init = function (obj){		
		var all = []; // 私有变量，只能通过方法来访问。
		
		// Collection的主体
		var factory = function () {
			//  P606
	 		/* Object.seal(this);  */
 		};
	
		factory.prototype = {
			constructor: factory,
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
			push: function (o) {
				all.push(o);
				return this;
			},
			pop: function () {
				return all.pop();
			},
			getAtIndex: function (index) {
				// 检测是否为数字
				if (typeof index !== "number") {
					console.log("参数必需是数字");
					return ;
				} 
				
				// 是否越界
				var tempLength = all.length;
				if (index > -- tempLength) {
					console.log("数组越界");
					return ;
				}
				
				var cur = all[index]
				return cur ? cur : void 0;
			},
			deleteAtIndex: function (index) {
				// 检测是否为数字
				if (typeof index !== "number") {
					console.log("参数必需是数字");
					return ;
				}
				
				// 是否越界
				var tempLength = all.length;
				if (index > -- tempLength) {
					console.log("数组越界");
					return ;
				}
				
				// 删除
				all.splice(index, 1);
				return this;
			},
			length: function () {
				return all.length;
			},
			empty: function () {
				all.length = 0;
				return this;
			},
			all: function () {
				return all.slice();	
			},
			first: function () {
				var first = all[0];
				return first ? first : void 0;
			},
			last: function () {
				var last = all[all.length - 1]
				return last ? last : void 0;
			}
		};
		
		// 可以用jQ对象数组来初始化Collection
		if (!!obj && obj instanceof $) {
			var coll = new factory();
			$(obj).each(function (index, ele) {
				coll.push(ele);
			});
			
			return coll;
		}
		
		return new factory ();
	}
	
	// 只暴露出Collection，保护init
	var Collection  = function (obj) {
		return new init(obj);
	};

	window.Collection = Collection;
}(window));