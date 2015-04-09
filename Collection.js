"use strict"
//CollectionJS
//version: 0.13

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

