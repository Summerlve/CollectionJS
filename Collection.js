;(function (){
	function Collection (){
		var all = [];
		function factory () {
			//  P606
	 		/* Object.seal(this);  */
 		}
	
		factory.prototype = {
			constructor: factory,
			extend: function (name ,func) {
				if (name === "" || typeof func !== "function") return ;
				
				// 检测函数是否重名
				if (name in this) {
					console.log("函数名重复了");
					return ;
				}
				this[name] = func;
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
					console.log("function getAtIndex's param must be a number !");
					return ;
				} 
				
				// 是否越界
				var tempLength = all.length;
				if (index > -- tempLength) {
					console.log("factory range index !");
					return ;
				}
				
				return all[index] ? all[index] : undefined;
			},
			deleteAtIndex: function (index) {
				// 检测是否为数字
				if (typeof index !== "number") {
					console.log("function getAtIndex's param must be a number !");
					return ;
				}
				
				// 是否越界
				var tempLength = all.length;
				if (index > -- tempLength) {
					console.log("factory range index !");
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
			first: function () {
				return all[0] ? all[0] : undefined;
			},
			last: function () {
				return all[all.length - 1] ? all[all.length - 1] : undefined;
			}
		} 
		
		return new factory ();
	}
	
	window.Collection = Collection;
}());

var coll = new Collection();
coll.push("zhangwhao");
console.log(coll.length());


var coll2 = new Collection();
coll2.push("fae");
coll2.push("fae");
coll2.push("fae");
console.log(coll2.length());
