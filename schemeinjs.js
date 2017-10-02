/*****************************************************
	Interpreter for Scheme in Javascript
		
	`Translated the python project of Peter Norvig
		      http://norvig.com/lispy.html
	
	#Features available
	  > All arithmetical and logical operations
	  > List operations
	  > Conditional operations
	  > Defining variables
	  > quote
	  	
	#Features Not Available
	  > Set!
	  > Lambda Functions
	  
	  Done on 02/10/2017 
	  Author: Abhijith Mahipal M
	  
******************************************************/	

//Input Section. Program fragments in variables Pi
var p0='(define a (list 1 2 3 4))';
var p1='(define b (* 5 (+ 8 3)))';
var p2='(cons b a )';


//The Function tokenizes the program ie, identifies the symbols, numbers and keywords.
var tokenize=function(chars){
	return chars.replace(/[(]/g,' ( ').replace(/[)]/g,' ) ').trim().split(/ +/);
}

//The following functions parses the tokens into meaningful lists.
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

/*The function creates an environment of scheme interpreter in the 
program by mapping scheme procedures to that in javascript   */
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
	function cons(a,b){b.unshift(a);return b;};
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

//The variable global_env receives the environment object, which can be accessed globally
global_env=std_env();

//The function evaluates the meaningful lists obtained after parsing, with refering environment
var eval=function(x,env){
	env=global_env;
  	if(typeof x == 'string')
     		return env[x];
  	else if(typeof x == 'number')
     		return x;
    else if(x[0]=='quote')
    	return x[1];
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

//Output calls section
eval(parse(p0));
eval(parse(p1));
console.log(eval(parse(p2)));
