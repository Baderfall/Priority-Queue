const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if (!this.root)
			return;
		else {
			var detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			this.heapSize--;
			return detached.data;
		}
	}

	detachRoot() {
		var detRoot = this.root;
		if (this.root.left)
			this.root.left.parent = null;
		if (this.root.right)
			this.root.right.parent = null;
		this.root = null;
		if (this.parentNodes[0] == detRoot)
			this.parentNodes.shift();
		return detRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.size() <= 1)
			return;
		else {
			var last = this.parentNodes[this.parentNodes.length - 1];
			var lastParent = last.parent;
			last.remove();
			this.root = last;
			if (last == detached.left)
				last.parent = null;
			else if (last == detached.right) {
				last.left = detached.left;
				last.left.parent = last;
				this.parentNodes.unshift(last);
				this.parentNodes.pop();
			}
			else {
				last.left = detached.left;
				last.left.parent = last;
				last.right = detached.right;
				last.right.parent = last;
				if (this.parentNodes.indexOf(lastParent) == -1)
					this.parentNodes.unshift(lastParent);
				this.parentNodes.pop();		
			}
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		if (this.heapSize == 0)
			return true;
		else
			return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}




	insertNode(node) {
		if(this.root == null){
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right)
				this.parentNodes.shift();
		}
	}





	shiftNodeUp(node) {
		if (node.parent == null) {
			this.root = node;
			return;
		}
		else if (node.priority > node.parent.priority) {
			var nIndex = this.parentNodes.indexOf(node);
			var pIndex = this.parentNodes.indexOf(node.parent);

			if (pIndex != -1)
				this.parentNodes[pIndex] = node;				
			if (nIndex != -1)
				this.parentNodes[nIndex] = node.parent;
			
			node.swapWithParent();
			this.shiftNodeUp(node)
		}
	}



	shiftNodeDown(node) {
		if (node == null || (node.left == null && node.right == null))
			return;
		else if (node.right == null || node.left.priority > node.right.priority) {
			if (node.left.priority > node.priority) {
				var nIndex = this.parentNodes.indexOf(node);
				var cIndex = this.parentNodes.indexOf(node.left);

				if (this.root == node)
					this.root = node.left;

				this.parentNodes[nIndex] = node.left;
				this.parentNodes[cIndex] = node;

				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
		}

		else if (node.left == null || node.right.priority > node.left.priority) {
			if (node.right.priority > node.priority) {
				var nIndex = this.parentNodes.indexOf(node);
				var cIndex = this.parentNodes.indexOf(node.right);

				if (this.root == node)
					this.root = node.right;

				this.parentNodes[nIndex] = node.right;
				this.parentNodes[cIndex] = node;
				
				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
