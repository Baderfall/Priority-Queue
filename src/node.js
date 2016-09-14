class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		node.parent = this;
		if (!this.left)
			this.left = node;
		else if (!this.right)
			this.right = node;
	}

	removeChild(node) {
		node.parent = null;
		if (this.left == node)
			this.left = null;
		else if (this.right == node)
			this.right = null;
		else
			throw new Error("Passed node is not a child of this node.");
	}

	remove() {
		if (this.parent)
			this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent)
			return;

		var t = this;
		var p = this.parent;
		var pl = p.left;
		var pr = p.right;

		if (p.parent){
			if (p.parent.left == p)
				p.parent.left = t;
			if (p.parent.right == p)
				p.parent.right = t;
		}

		t.parent = p.parent;

		if (t.left)
			t.left.parent = p;
		if (t.right)
			t.right.parent = p;





		if (t == p.left){
			var tDirection = "left";
		}
		else if (t == p.right){
			var tDirection = "right";
		}

		p.left = t.left;
		p.right = t.right;
		p.parent = t;

		if (tDirection == "left") {
		t.right = pr;
		t.left = p;
		if (pr)
			pr.parent = t;
		}
		else if (tDirection == "right") {
		t.right = p;
		t.left = pl;
		if (pl)
			pl.parent = t;
		}
	}
}

module.exports = Node;

