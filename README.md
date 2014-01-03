replacejs
=========

A small cli app that lets you replace text using javascript's [replace function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)


Installation
--------------
```sh
$ git clone https://github.com/rabidmachine9/replacejs
$ cd replacejs 
$ npm install
$ chmod +x replace.js
```
Change #!/usr/bin/node in the first line to your node path if necessary
You can also add the command to your $PATH if you feel it's handy

Examples 
----------
Replace all a's with b's in somefile.txt and save the result in resultfile.txt if -g was not used only first occurence of 'a' would be replaced, it is a good convention to always use brackets(' '), otherwise something sometimes will break.
```sh
$ ./replace.js somefile.txt 'a' -g 'b' resultfile.txt
```
Replace all double characters with single 
```sh
$ ./replace.js somefile.txt  '([\w])\1' -gi '$1' resultfile.txt
```
Get help
```sh
$ ./replace.js -h
```

Simple stuff, enjoy!

License
----
MIT

    