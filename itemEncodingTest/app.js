const NUMBER_OF_ITEMS = 265;
const RECORD = ';';
const VALUE = ',';


const LOWER_CASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const UPPER_CASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OTHER = ['+', '/', '$', '-', '_', '!', '*', '(', ')'];
const ALPHABET = NUMBERS.concat(LOWER_CASE.concat(UPPER_CASE.concat(OTHER)));

const IDENTIFIERS = [
	"Craft:","Purchase:","Gloom:","Ivan:","Snaebjorn:","Tindur:","Snorri:"
]

function keyup(){
	var uncompressed = $('#uncompressed').val();
	var uncompressedLength = uncompressed.length;
	$('#uncompressed-length').text(uncompressedLength);
	
	var compressed = encode(uncompressed);
	var compressedLength = compressed.length;
	$('#compressed').text(compressed);
	$('#compressed-length').text(compressedLength);
	
	var decompressed = decode(compressed);
	$('#decompressed').text(decompressed);
}

function encode(dataString){
	
	dataString = dataString.replace(/\s/g, "");
	
	var compressedRecords = Array(IDENTIFIERS.length);
	
	var records = dataString.split(RECORD);
	for(var i = 0; i < records.length; i++){
		var record = records[i];
		if(!record){
			continue;
		}
		var id = identifyDecodedRecord(record);
		var index = IDENTIFIERS[id].length;
		record = record.substring(index);
		
		var values = record.split(VALUE);
		var compressedRecord = '';
		for(var j = 0; j < values.length; j++){
			var value = values[j];
			if(!value){
				continue;
			}
			if(value.startsWith('g')){
				value = value.substring(1);
			}
			compressedRecord += encodeItemCode(value);
		}
		compressedRecords[id] = compressedRecord;
	}
	
	return compressedRecords.join(RECORD);
}

function decode(dataString){
	dataString = dataString.replace(/\s/g, "");
	var decodedRecords = Array(IDENTIFIERS.length);
	
	var records = dataString.split(RECORD);
	for(var i = 0; i < records.length; i++){
		var record = records[i];
		if(!record){
			continue;
		}
		
		var codes = splitEncodedRecord(record);
		
		var decodedRecord = [];
		for(var j = 0; j < codes.length; j++){
			var code = codes[j];
			var value = decodeItemCode(code);
			if(i === 2){ // If Gloomhaven
				value = 'g' + value;
			}
			decodedRecord.push(value);
		}
		var id = identifyEncodedRecord(i);
		decodedRecords[i] = id + decodedRecord.join(VALUE);
	}
	
	return decodedRecords.join(RECORD) + RECORD;
}

function identifyDecodedRecord(record){
	for(var i = 0; i < IDENTIFIERS.length; i++){
		if(record.startsWith(IDENTIFIERS[i])){
			return i;
		}
	}
}

function identifyEncodedRecord(index){
	return IDENTIFIERS[index];
}

function splitEncodedRecord(record){
	var values = [];
	var i = 0;
	
	var base = lowestBase();
	var freebies = ALPHABET.length-base;
	while(i < record.length){
		var tmp = record.substring(i, i+1);
		var index = ALPHABET.findIndex((value) => value === tmp);
		if(index >= base){
			values.push(tmp);
			i++;
		} else {
			tmp = record.substring(i, i+2);
			values.push(tmp);
			i+=2;
		}
	}
	
	return values;
}

function encodeItemCode(code){
	var base = lowestBase();
	var freebies = ALPHABET.length-base;
	
	var num = Number(code);
	if(Number(code) < freebies){
		return ALPHABET[base+num];
	} else {
		var reducedAlphabet = ALPHABET.slice(0, base);
		return convertFromBaseTen(num-freebies+base, reducedAlphabet); // add base to num-freebies because otherwise we don't know whether e.g. 11 = 11 or 11 = 1 and then another 1
	}
}

function decodeItemCode(code){
	var base = lowestBase();
	var freebies = ALPHABET.length-base;
	
	var padLength = NUMBER_OF_ITEMS.toString().length;
	
	if(code.length === 1){
		var index = ALPHABET.findIndex((value) => value === code);
		if(index >= base){
			return (index-base).toString().padStart(padLength, '0');
		}
	}
	
	var reducedAlphabet = ALPHABET.slice(0, base);
	
	var num = Number(convertToBaseTen(code, reducedAlphabet))+freebies-base; // subtract base from base10+freebies because otherwise we don't know whether e.g. 11 = 11 or 11 = 1 and then another 1
	numStr = num.toString().padStart(padLength, '0');

	return numStr
}

function lowestBase(){
	
	var base = 2;
	var freebies = ALPHABET.length-base;
	
	while(base*base+freebies-base < NUMBER_OF_ITEMS && base < ALPHABET.length){ // subtract base from base*base+freebies because otherwise we don't know whether e.g. 11 = 11 or 11 = 1 and then another 1
		base+=1;
		freebies-=1;
	}
	
	return base;
}

function convertFromBaseTen(value, alphabet){
	return convertBase(value, 10, alphabet.length, alphabet);
}

function convertToBaseTen(value, alphabet){
	return convertBase(value, alphabet.length, 10, alphabet);
}

function convertBase(value, from_base, to_base, range) {
  value = value.toString();
  var from_range = range.slice(0, from_base);
  var to_range = range.slice(0, to_base);
  
  var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
    if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
    return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
  }, 0);
  
  var new_value = '';
  while (dec_value > 0) {
    new_value = to_range[dec_value % to_base] + new_value;
    dec_value = (dec_value - (dec_value % to_base)) / to_base;
  }
  return new_value || '0';
}

$(document).ready(function() {
	
	for(var i = 0; i < 1000; i++){
		var code = i.toString();
		var encoded = encodeItemCode(code);
		var decoded = decodeItemCode(encoded);
		
		console.log(code + ' -> ' + encoded + ' -> ' + decoded);
	}
	
	var uncompressedEditor = document.getElementById("uncompressed");
	var compressedEditor = document.getElementById("compressed");
	
	uncompressedEditor.addEventListener("keyup", keyup);
});