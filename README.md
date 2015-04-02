# What's CollectionJS
    just warp the javascript origin array.
    based class : Collection
    extension class : Stack , Queue 
# INSTALL
	<script src="Collection.js"></script>
# METHODS
####Collection :
		each
		map
		get
		remove
 		length
		empty
		toArray
		first
		last	

####Stack :
		push
		pop

####Queue : 
		unshift
		shift

# USING
  		var stack = new Stack();
		stack.push("a", "b");
		stack.push("c", "d");
		stack.display();
		
		stack.each(function (cur, index) {
			console.log(this + "：" + index);
		});
		
		var result = stack.map(function (cur, index) {
			return this + "mapmapmap";
		});
		console.log(result);
		
		var queue = new Queue();
		queue.unshift("1", "2");
		queue.unshift("3", "4");
		queue.display();

