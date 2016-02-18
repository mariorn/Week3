

function caesarCipher (message, shift ) {
  var a_ascii = "a".charCodeAt(0);
  var z_ascii = "z".charCodeAt(0);

  var a_upper_ascii = "A".charCodeAt(0);
  var z_upper_ascii = "Z".charCodeAt(0);

  var result = message.split('').reduce(function(aux, caracter, j){
    var a = a_ascii;
    var z = z_ascii;

    if(caracter.charCodeAt(0) >= a_upper_ascii && caracter.charCodeAt(0) <= z_upper_ascii){
      a = a_upper_ascii;
      z = z_upper_ascii;
    }

    var caracter_num = caracter.charCodeAt(0) + shift;
 
    if (caracter.charCodeAt(0) < a){
      return aux + caracter;
    }else if (caracter_num > z){
      return  aux + String.fromCharCode( ( a + (caracter_num - z) -1  ) );
    }
    
    return aux + String.fromCharCode(caracter_num);

    }, "")

  return result;
}


var encrypted = caesarCipher("Et tu, brute?", 6);

console.log(encrypted);
//=> "Kz za, hxazk?"

