var program='(begin (define r 10) (* pi (* r r)))';
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

var atom=funtion(token){
	if(isNaN(Number(token))){
		return String(token);
	}
	else
		return Number(token);
}

























console.log(parse(program));
//console.log()
//console.log()


