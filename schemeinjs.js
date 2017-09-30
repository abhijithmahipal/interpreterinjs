var p0='(define a (list 1 2 3 4 5))';
var p1='(define b (> 1 2))';
var p2='(cons 2 a )';
var tokenize=function(chars){
	return chars.replace(/[(]/g,' ( ').replace(/[)]/g,' ) ').trim().split(/ +/);
}

var parse=function(program){
	return read_from_tokens(tokenize(program));
}

var read_from_tokens=function(tokens){
	if(tokens.length == 0){
		throw('Syntax Error : unexpected EOF while reading');
		return;
	}
	token=tokens.shift();
	if(token=='('){
		var l=[];
		while(tokens[0]!=')'){
			l.push(read_from_tokens(tokens));
		}
		tokens.shift();
		return l;
	}
	else if(token==')'){
		throw('Syntax Error : unexpected');
		return;
	}
	else{
		return atom(token);
	}
}

var atom=function(token){
	if(isNaN(Number(token))){
    		return String(token);
  	}
   	else
     		return Number(token);
}

var std_env=function(){
	function mul(a,b){return a*b;};
	function add(a,b){return a+b;};
	function sub(a,b){return a-b;};
	function div(a,b){return a/b;};
	function gt(a,b){return a>b;};
  	function lt(a,b){return a<b;};
  	function ge(a,b){return (a>b && a==b);};
	function le(a,b){return (a<b && a==b);};
	function eq(a,b){return a==b;};
	function append(a,b){return a.concat(b);};
	function car(a){return a[0]};
	function cdr(a){return a.slice(1)};
	function cons(a, b){b.unshift(a);return b;};
	function len(a){return a.length;};
	function listcheck(a){return (typeof a)=='object';};
	function not(a){return !a;};

  	env={
    	'*': mul,
		'+': add,
		'-': sub,
		'/': div,
		'<': lt,
		'>': gt,
		'<=':le,
		'>=':ge,
		'=':eq,
		'abs':Math.abs,
		'append':append,
		'list':Array,
		'car':car,
		'cdr':cdr,
		'cons':cons,
		'eq?':eq,
		'equal?':eq,
		'length':len,
		'list?':listcheck,
		'not':not,
		'min':Math.min,
		'max':Math.max,
		'round':Math.round,
		'sin':Math.sin,
		'cos':Math.cos,
		'tan':Math.tan,
		'sqrt':Math.sqrt,
		'pow':Math.pow,
		'log':Math.log

  	};
  	return env;
}

global_env=std_env();

var eval=function(x,env){
	env=global_env;
  	if(typeof x == 'string')
     		return env[x];
  	else if(typeof x == 'number')
     		return x;
	else if(x[0]=='if'){
		var test = x[1];
		var conseq=x[2];
		var alt=x[3];
		if(eval(test,env))
			exp=conseq;
		else
			exp=alt;
		return eval(exp,env);
	}
	else if(x[0]=='define'){
		var vari=x[1];
		var exp=x[2];
		env[vari]=eval(exp,env);
		return 'Variable Added';
	}
	

  	else{
    		var proc = eval(x[0],env);
    		var args=[];
		for(var i=1;i<x.length;i++)		
      			args.push(eval(x[i],env));
		return proc.apply(this,args);
  	}
}


console.log(eval(parse(p0)));
console.log(eval(parse(p1)));
console.log(eval(parse(p2)));
