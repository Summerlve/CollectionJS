"use strict"
//CollectionJS
;(function (window){
	var version = 0.12;
		
	// 原生函数的原型对象
	var ArrayProto = Array.prototype;
	var ObjProto = Object.prototype;
	
	// 原生函数
	var toString = ObjProto.toString;
	var unshift = ArrayProto.unshift;
	var push = ArrayProto.push;
	var preventExtensions = Object.preventExtensions; // 不可扩展对象
	
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
		tag: "", // 用于全局搜索数据结构，必须是字符串，不能重复。
		display: function () {
			// just for test			
			console.log(this.all);	
		},
		// Using Method
		size: function () {
			return this.all.length;
		},
		isEmpty: function () {
			return this.all.length === 0 ? true : false;
		}
	};
		
	// SingleLinkedList
	function SingleLinkedList () {
		this.head = this;
		this.tail = this;
		this.next = null;
		this.length = 0;
	}
	
	SingleLinkedList.prototype = {
		constructor: SingleLinkedList,
		addToTail: function (data) {
			var o = {
				data: data,
				next: null
			};
			this.tail.next = o;
			this.tail = o;
			++ this.length;
		},
		size: function () {
			return this.length;	
		},
		isEmpty: function () {
			return this.length === 0 ? true : false;
		},
		display: function () {
			var cur = this.head.next;
			var result = ["Head"];
			while (cur !== null) {
				result.push(cur.data);
				cur = cur.next;
			}
			console.log(result.join(" -> "));
		}
	};

	
	// Stack 
	function Stack (tag) {
		if (!isString(tag)) throw "tag必须是字符串";
		Collection.call(this, tag);
		Stack.lib.add(this);
		preventExtensions(this);
	}

	Stack.lib = new Lib();
	
	Stack.prototype = new Collection();
	var StackProto = Stack.prototype;
	StackProto.constructor = Stack;
	
	StackProto.push = function (o) {
		this.all.push(o);		
		return this;
	};
		
	StackProto.pop = function () {
		return this.all.pop();
	};
	
	StackProto.foreach = function (fn) {
		for (var i = this.all.length - 1; i >= 0; i--) {
			var cvl = this.all[i];
			fn.call(cvl, cvl);
		}
	};
	
	
	// Queue
	function Queue (tag) {
		Collection.call(this, tag);
		Queue.lib.add(this);
		preventExtensions(this);
	}
	
	Queue.lib = new Lib();
	
	Queue.prototype = new Collection();
	var QueueProto = Queue.prototype;
	QueueProto.constructor = Queue;
	
	QueueProto.enqueue = function (o) {
		this.all[this.all.length] = o;
		return this;	
	};
	
	QueueProto.dequeue = function () {
		if (this.all.length === 0) throw "队列已空";
		return this.all.shift();
	};
	
	QueueProto.foreach = function (fn) {
		for (var i = 0; i < this.all.length; i++) {
			var cvl = this.all[i];
			fn.call(cvl, cvl);
		}
	};
	
	// 映射成全局变量
	window.Collection = Collection;
	window.Stack = Stack;
	window.Queue = Queue;
	window.SingleLinkedList = SingleLinkedList;
}(window));