var program='(* 480 55)';
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
  
  env={
    '*': mul
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
  else{
    proc = eval(x[0],env);
    var args=[];
    console.log(x[2]);
    for(i=1;i<x.length;i++)
      args.push(eval(x[i],env));
   	console.log(args);
	return proc.apply(this,args);
  }
}


console.log(parse(program));
console.log(eval(parse(program)));

