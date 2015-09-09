// Lets see Javascript OverPowered Stuff
/*** OP: #1 ***/
// Prototypes and Constructors, how new instances behave with parameters inside the prototype and in constructor
// new Operater wraps the function into the new instance not the prototype, prototype is inherited by reference,
// and like all refences changing a refered object cahnges the original and any other object that is refered to it.

var z = function () { 
	this.x = 10;
};
z.prototype = {
    arr: [],
    pushVal: function (val) {
        [].push.call(this.arr, val);
    },
    getZ: function () {
        return this.arr;
    }
};

var Z = function () { 
	this.x = 10;
	this.arr = [];
};
Z.prototype = {
    pushVal: function (val) {
        [].push.call(this.arr, val);
    },
    getZ: function () {
        return this.arr;
    }
};

var a,s,d,A,S,D;

a = new z;
s = new z;
d = new z;

a.pushVal(1); // [1]
s.pushVal(2); // [1,2]
d.pushVal(3); // [1,2,3]

d.getZ(); // output [1,2,3];

A = new Z;
S = new Z;
D = new Z;

A.pushVal(1); // [1]
S.pushVal(2); // [2]
D.pushVal(3); // [3]

D.getZ() // output [3]


/*** OP: #2 ***/

// closures stores their outer values by references. not by value

var arrParser = function ( arr ) {
	var i = 0, l, result = [],
		z = function ( i ) { result[i] = function () { return arr[i]+' '+i}; };
	for (l = arr.length; i < l; ++i) {
		z( i );
	}

	return result;
}, parser = arrParser([10,20,30,40,50]);

parser[0](); // undefined 5

var arrParser = function (arr) {
	var i = 0, l, result = [];

	for (l = arr.length; i < l; ++i) {
		(function (i) {
			result[i] = function () { return arr[i]+' '+i};
		} (i));
	}

	return result;
}, parser = arrParser([10,20,30,40,50]);

parser[0](); // 10 0

// closure 
var f = function (v) { // variable v is initalized and accessed as if it was var v
    return {
        a: function () {
            v += 1; // increase v in closure reference
            return v + 1;
        },
        b: function () {
            return v;
        }
    }
}, d = f(9);

d.a(); // 11
d.b(); // 10


/*** OP# 3 : FALSY and TRUTHY***/

if (FALSY) {
	// falsy stuff : false, 0, -0, "", NaN, null, and undefined

	function VECTOR (x,z) {
		if (!x) { this.x = 100;} 
		if (!y) { this.x = 200;}

		return this; 
	}

	// expected coordinates to be 0, got 100/200
	var v = new VECTOR(0,0); // {x:100, y; 200}
} 

if (TRUTHY) {
	// most js stuff is truthy	
}


/*** OP# 4 : Major problem with digits ***/

var buggy  = 0.1 + 0.2; // 0.30000000000000004

// solution as a sample

function digitFixSum(vals) {
    var args = [].slice.call(arguments),
        total = 0,
        len = 0;
    args.map(function (v, i) {
        total += v * 1000;
        len += 1;
    });
    return (total / 1000);
}

digitFixSum(0.1,0.2);

/*** OP# 5 : Refence for functions to the THIS ***/

// this one is really wide in examples, more tweaking will be needed;
a = 5; b = 5;
var o = {a:10, b:20}, g = function () {
    return {
        f: function () {
            return this.a + this.b;
        },
        ref: this
    };
}.call(o);

g.ref(); // o {a:10,b20} g function has reference as this to object o, via call(0)

g.f(); // NaN as the refence is object of return

g.f.call(g.ref); // 30 since we pass the expectred refence of o which we saved in ref

// returned functions retain their own scope of reference to this;

var c = function () {
    return function () {
        return this.a + this.b;
    };
}.call(o);

c(); // 10 returned function has a scope to window

c.call(o); // 30 reference has changed of this

/*** OP# 6 : true type ***/

toString.call([]);           // [object Array]
toString.call({});          // [object Object]
toString.call(2);            // [object Number]
toString.call('[]');         // [object String]
toString.call(true);         // [object Boolean]
toString.call(function(){}); // [object Function]

/*** OP# 7 : Non stalling code/ Async ***/

var foo = function timeOut() {
    this.sum = 0;
};
foo.prototype.zoo = function zooy(times, cb, sum, ref) {
    var t = times,
        _t = ref || this;
    
    if (times < 0) {
    	cb(_t.sum);
        return _t.sum;
    } else {
        if (ref) {
            _t.sum += sum;
        }
        setTimeout(zooy(t - 1, cb, t, _t), 0); // setTimeout breaks any refence and sets itself to window scope
    }
};

var z = new foo();

var sum = z.zoo(5,function(v){console.log('I GOT sum',v)}); // 15
// long looping code here zoo(5) will execute with delay
console.log(10*12*Math.PI,'AND',sum); // value of equation and undefined since SUM is async



