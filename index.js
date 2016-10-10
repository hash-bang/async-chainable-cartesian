function lazyProduct(sets,f,context){
	if (!context) context=this;
	var p=[],max=sets.length-1,lens=[];
	for (var i=sets.length;i--;) lens[i]=sets[i].length;
	function dive(d){
		var a=sets[d], len=lens[d];
		if (d==max) for (var i=0;i<len;++i) p[d]=a[i], f.apply(context,p);
		else        for (var i=0;i<len;++i) p[d]=a[i], dive(d+1);
		p.pop();
	}
	dive(0);
}


module.exports = function() {
	// product() {{{
	this._plugins['product'] = function(params) {
		lazyProduct(params.content, function(i) {
			params.callback.apply(this, i);
		});

		this._execute();
	};

	this.product = function() {
		this._struct.push({
			type: 'product',
			content: arguments[0,
			callback: arguments[1],
		});

		return this;
	};
	// }}}
};
