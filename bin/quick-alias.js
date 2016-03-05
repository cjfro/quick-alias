#!/usr/bin/env node

'use strict';


// MODULES //

var readline = require('readline');
var fs = require('fs');


// CONSTANTS //

var BASH_PROFILE = process.env.HOME + '/.bash_profile';
var HEADER = '### BEGIN AUTO-GENERATED ALIASES ###';
var FOOTER = '### END AUTO-GENERATED ALIASES ###';


// VARIABLES //

var lines = [],
    reader;


// QUICK-ALIAS //

reader = readline.createInterface({
    input: process.stdin
});

reader.on('line', function(line) {
    lines.push(line.trim());
});

reader.on('close', function() {
    var cmd = lines[lines.length - 2].split(/ (.+)?/)[1].trim();
    var alias = process.argv[2];

    fs.readFile(BASH_PROFILE, 'utf8', function(err, data) {
        var bashLines = data.split('\n');
        var footerIdx = bashLines.indexOf(FOOTER);
        var newLine = 'alias ' + alias + '=\'' + cmd + '\'';

        if (footerIdx === -1) {
            var newLines = [
                '',
                '',
                HEADER, 
                '',
                newLine,
                '',
                FOOTER
            ];

            bashLines.push.apply(bashLines, newLines);
        } else {
            bashLines.splice(footerIdx - 1, 0, newLine);
        }

        fs.writeFile(BASH_PROFILE, bashLines.join('\n'));        
    });
});