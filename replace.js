#!/usr/bin/node
var fs = require('fs');
var colors = require('colors');
var argv = require('optimist')
		.boolean(['g','i','m','y','h'])
		.alias('h', 'help')
		.alias('g', 'global')
		.alias('i', 'ignore')
		.alias('m', 'multiline')
		.alias('y', 'sticky')
		.argv;

var help = "usage:[options] [filename] [regex-pattern] [result-string] [result-file]\n\n" + 
"a tool that helps you replace string patterns into text files using javascript's replace function reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace\n" + 
"options:\n" + "[filename] # the file that we want to change\n" + 
"[regex-pattern] # the pattern we are searching to replace, in order to use \\ we must used double (\\\\) \n" + 
"[result-string] # the replacement string it also uses references with $1,$2 etc. \n" + 
"[result-file] # if you use no result file the original filename with some extention will be used \n" + 
"-g ,[--global] # regex global flag if not used only first occurence will be replaced! \n" +
"-i ,[--ignore] # regex ignore case flag\n" +
"-m ,[--multiline] # regex multiline flag \n" + 
"-y ,[--sticky] # regex sticky flag \n" +   
"-h ,[--help] # Show this help message and quit";


var arguments = argv._;

//just display the manual and exit
if(argv.h){
	console.log(help.cyan);
}


else{
	//catching the arguments
	var filename = arguments[0]; 
	var searchPattern = arguments[1];
	var replacePattern = arguments[2];
	var resultFile = arguments[3];
	//if result file is not specified
	if(resultFile === undefined){
		if(filename.indexOf('.') !== -1){
			var splitFilename = filename.split('.',2);
			var resultFile = splitFilename[0]+'-result.'+splitFilename[1];
		}
		else{
			var resultFile = filename+'-result';
		}
	}
	//adding the flags
	var flags = '';
	if(argv.g) flags += 'g';
	if(argv.i) flags += 'i';
	if(argv.m) flags += 'm';
	if(argv.y) flags += 'y';

	//converting the string to regex
	var regex = new RegExp(searchPattern, flags);

	//read and export to another file, if there is no error
	fs.readFile(filename,'utf8', function(err, data){
		if (err) {
	  	return console.log('something went wrong with the readfile maybe it doesn\'t exist?'.red);
		}
		var result = data.replace(regex, replacePattern);
		fs.writeFile(resultFile, result, 'utf8', function (err) {
			if (err) return console.log('There is something wrong with exporting the data in a new file, maybe permissions?'.red);
		});
	});
}




