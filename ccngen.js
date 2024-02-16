#!/usr/bin/env node
let
dis = Array.from( {length: 622925-622126 +1}, (_,i) => i+622126),
jcb = Array.from( {length: 3589-3528 +1}, (_,i) => i+3528),
mstc = Array.from( {length: 2720-2221 +1}, (_,i) => i+2221),
msr = Array.from( {length: 69-56 +1}, (_,i) => i+56);

var allCC = new Map([
 ['American Express', [[15], 34, 37]],
 ['Diners', [[14], 300, 301, 302, 303, 304, 305, 36, 38, 39]],
 ['Visa', [[13,16,19], 4, 453, 453, 455, 491, 492, 402, 448, 471]],
 ['Mastercard', [[16,19], 51, 52, 53, 54, 55, ...mstc, 223, 224, 225, 226, 227, 228, 229, 23, 24, 25, 26, 270, 271]],
 ['Discover', [[16,17,18,19], 6011, ...dis, 644, 645, 646, 647, 648, 649, 65]],
 ['Maestro', [[12,13,14,15,16,17], 50, ...msr]],
 ['JCB', [[16], ...jcb]],
 ['China Union Pay', [[16,17,18,19], 62]],
 ['Voyager', [[15], 8699]],
]);

function ccnumber( cc, num=5) {
 var
 array = allCC.get(cc),
 digit = array[0],
 marks = array.slice(1),
 nuM = marks.length;

 console.log('\n'+cc+' ('+digit,'digits) :')
 for (let nDIG of digit) {
  for (let n=num; n-- > 0;) {

   let number = marks[ Math.floor( Math.random()*nuM ) ]
   number = String( number);
   while (number.length < (nDIG-1))    // simplest random-based number
     number += Math.floor(Math.random()*10);

    var u =0, pos = nDIG-2; // get check digit: loop from # digit less one to 0
    while ( pos >= 0 ) {

        odd = +number[ pos]*2;   // "+" coerces integer type expression 
        u += odd>9 ? odd-9 : odd;
        if ( pos ) u += +number[ pos-1];
        pos -= 2;
    }
    console.log(number += Math.ceil(u/10) *10 -u);
  }
 }
}

function getallCC( n) {
 for (let cc of allCC.keys()) ccnumber( cc, n);
}

let
ar = process.argv.slice(2), n;
if (ar[0]) {
 n = +ar[0];
 if (!n) { console.log('argument must be a positive integer number'); process.exit()}
} else n = 5;

(async ()=>{
 await getallCC( n); //.then( r => console.log(r));
 process.exit()
})()
