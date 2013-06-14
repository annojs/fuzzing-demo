#!/usr/bin/env node
var annotate = require('annotate');
var is = require('annois');
var fuzz = require('annofuzz');

fuzz._amount = 10;

var title = annotate('title', 'Converts `foo barMoo` to `Foo Barmoo`')
    .on(is.string, function(a) {
        return a.split(' ').map(function(part) {
            if(part.length) return part[0].toUpperCase() + part.slice(1).toLowerCase();
        }).join(' ');
    })
    .satisfies(is.string);

// every part should begin with an uppercase letter
fuzz(title, function(op, a) {
    var parts = op(a).split(' ');

    if(!a.length) return true;

    return parts.map(fst).map(isUpper).filter(id).length == parts.length;
});

// every character apart from the first of each part should be lowercase
fuzz(title, function(op, a) {
    var parts = op(a).split(' ').filter(function(a) {
        return a.length > 1;
    });

    return parts.map(operate('slice', 1)).filter(isLower).filter(id).length == parts.length;
});

function operate(op, n) {
    return function(a) {
        return a[op](n);
    };
}
function fst(a) {return a[0];}
function id(a) {return a;}
function isUpper(a) {return a && a.toUpperCase() == a;}
function isLower(a) {return a && a.toLowerCase() == a;}
