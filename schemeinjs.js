var program='(begin (define r 10)(* pi (* r r)))';
var tokens=function tokenize(chars){
	return chars.replace(/[(]/g,' ( ').replace(/[)]/g,' ) ').trim().split(/ +/);
}






console.log(tokens(program));
//console.log()
//console.log()


