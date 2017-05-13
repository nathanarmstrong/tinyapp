console.log('******************************');
////////\\\\\\\////////\\\\\\\\


var name = 'alice';
console.log(`hello, ${name}`);


console.log('******************************');
////////\\\\\\\////////\\\\\\\\

console.log('Hello world \n' +
 'welcome! ' + name);


console.log('******************************');
////////\\\\\\\////////\\\\\\\\

name = 'Bruce';
var b = Math.random(50) *10000
var c = Math.round(b)
console.log('welcome ' + name + "\n"
  + 'you are our ' + c + '  customer!' )


console.log('******************************');
////////\\\\\\\////////\\\\\\\\




console.log(`welcome ${name}
you are our ${c} customer!`)

var person = ['Mike Hawk'];
var age = [25];

function myTag(strings, personexp, ageExp){

  var str0 = strings[0];
  var str1 = strings[1];


  var ageStr;
  if (ageExp > 99){
    ageStr = 'lived in the past';
  } else {
    ageStr = 'live in thier past';
  }

  return str0 + personexp + str1 + ageStr;
}

var output = myTag`that ${ person } is ${ age }`;
console.log(output)



console.log('******************************');
////////\\\\\\\////////\\\\\\\\



function template(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length -1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    })
    return result.join('');
  });
}

var t1Closure = template`${0}${1}${0}`;
t1Closure('Y' , 'A');

var t2Closure = template`${0} ${'foo'}!`;
t2Closure('Hello', {foo: "World"});

template(t1Closure)




console.log('******************************');
////////\\\\\\\////////\\\\\\\\


















console.log('******************************');
////////\\\\\\\////////\\\\\\\\


