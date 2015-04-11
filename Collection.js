"use strict"
// CollectionJS
// version: 0.13

// Stack and Queue
function Node (item) {
	this.item = item;
	this.next = null;
}

function Stack () {
	this.first = null;
	this.N = 0;
}

Stack.prototype = {
	constructor: Stack,
	size: function () {
		return this.N;
	},
	isEmpty: function () {
		return this.first === null;
	},
	push: function (item) {
		var oldfirst = this.first;
		this.first = new Node(item);
		this.first.next = oldfirst;
		++ this.N;
		return this;
	},
	pop: function () {
		if (this.isEmpty()) throw "Stack为空";
		var item = this.first.item;
		this.first = this.first.next;
		-- this.N;
		return item;
	},
	foreach: function (fn) {
		if (this.isEmpty()) throw "Stack为空";
		var cur = this.first;
		while (cur !== null) {
			fn.call(null, cur.item);
			cur = cur.next;
		}
	}
};

function Queue () {
	this.first = null;
	this.last = null;
	this.N = 0
}

Queue.prototype = {
	constructor: Queue,
	size: function () {
		return this.N;
	},
	isEmpty: function () {
		return this.first === null;
	},
	enqueue: function (item) {
		var oldlast = this.last;
		this.last = new Node(item);
		if (this.isEmpty()) {
			this.first = this.last;
		} else {
			oldlast.next = this.last;
		}
		++ this.N;
		return this;
	},
	dequeue: function (item) {
		if (this.isEmpty()) throw "Queue为空";
		var item = this.first.item;
		this.first = this.first.next;
		if (this.isEmpty()) this.last = null;
		-- this.N;
		return item;
	},
	foreach: function (fn) {
		if (this.isEmpty()) throw "Queue为空"; 
		var cur = this.first;
		while (cur !== null) {
			fn.call(null, cur.item);
			cur = cur.next;
		}
	}
};


// DoubleLinkedList
function DoubleNode (item) {
	this.item = item;
	this.prev = null;
	this.next = null;
}

function DoubleLinkedList () {
	this.first = null;
	this.last = null;
	this.N = 0;
}

DoubleLinkedList.prototype = {
	constructor: DoubleLinkedList,
	isEmpty: function () {
		return this.N === 0;
	},
	size: function () {
		return this.N;
	},
	addToHead: function (item) {
		if (this.isEmpty()) {
			this.first = new DoubleNode(item);
			this.last = this.first;
		} else {
			var oldfirst = this.first;
			this.first = new DoubleNode(item);
			this.first.next = oldfirst;
			oldfirst.prev = this.first;
		}
		
		++ this.N;
		return this;
	},
	addToTail: function (item) {
		if (this.isEmpty()) {
			this.first = new DoubleNode(item);
			this.last = this.first;
		} else {
			var oldlast = this.last;
			this.last = new DoubleNode(item);
			oldlast.next = this.last;
			this.last.prev = oldlast;
		}
		
		++ this.N;
		return this;
	},
	removeHead: function () {
		if (this.isEmpty()) throw "cnm";
		
		var item = this.first.item;
		this.first = this.first.next;
		-- this.N;
		if (this.size() === 0) this.last = null;
		
		return item;
	},
	removeTail: function (){
		if (this.isEmpty()) throw "cnm";
		
		var item = this.last.item;
		this.last = this.last.prev;
		-- this.N;	
		if (this.size() === 0) {
			this.first = null;	
		} else {
			this.last.next = null;
		}
		
		return item;
	},
	insertBefore: function (index, item) {
		if (this.isEmpty()) throw "空了，你插个屁";
		if (index > this.size() || index === 0 || index < 0) throw "我草泥马";
		
		if (index === 1) { 
			this.addToHead(item);
		} else {
			var cur = this.first;
			var step = 1;
			
			while (step !== index) {
				cur = cur.next;
				++ step;
			}
			
			var oldprev = cur.prev;
			cur.prev = new DoubleNode(item);
			cur.prev.next = cur;
			cur.prev.prev = oldprev;
			oldprev.next = cur.prev;
			
			++ this.N;
		}
	},
	insertAfter: function (index, item) {
		if (this.isEmpty()) throw "空了，你插个屁";
		if (index > this.size() || index === 0 || index < 0) throw "我草泥马";
		
		if (index === this.size()) {
			this.addToTail(item);
		} else {
			var cur = this.first;
			var step = 1;
			
			while (step !== index) {
				cur = cur.next;
				++ step;
			}
			
			var oldnext = cur.next;
			cur.next = new DoubleNode(item);
			cur.next.prev = cur;
			cur.next.next = oldnext;
			oldnext.prev = cur.next;
			
			++ this.N;
		}
	},
	removeAtIndex: function (index) {
		if (this.isEmpty()) throw "空了，你删个屁";
		if (index > this.size() || index === 0 || index < 0) throw "我草泥马";
		
		if (index === 1) {
			return this.removeHead();
		} else if (index === this.size()) {
			return this.removeTail();
		} else {
			var cur = this.first;
			var step = 1;
			
			while (step !== index) {
				cur = cur.next;
				++ step;
			}
			
			var prev = cur.prev;
			var next = cur.next;
			var item = cur.item;
			prev.next = next;
			next.prev = prev;
			
			-- this.N;
			return item;
		}
	},
	foreach: function (fn) {
		var cur = this.first;
		while (cur !== null) {
			fn.call(null, cur.item);
			cur = cur.next;
		}
	},
	display: function () {
		if (this.isEmpty()) throw "为空";
		var result = [];
		this.foreach(function (cur) {
			result.push(cur);
		});
		
		return result.join(" <-> ");
	}
};



