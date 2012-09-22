/* Agenda

- A (likely quite brief) History
- JavaScript is everywhere
- jQuery. Magic? No, silly, JavaScript!
- Dive in, check depth later.
- My favorite parts (so far).
- What to look forward to (ES6).
*/

// Variables!
// Global versus scoped
var myVar = 0;
globalVar = "global";

// Types!
typeof undefined; 		// "undefined"
typeof true; 			// "boolean"
typeof 0; 				// "number"
typeof "string"; 		// "string"
typeof {}; 				// "object"
typeof function () {};	// "function"
typeof null; 			// "object" Wait, what?
typeof NaN;

null == {};				// false

// Null is an empty object pointer
// More on that later :)

// Passing variables - Value Vs. Reference

// By Value
function anotherExample(a1) {
	// a1
	a1 = 100;
}

var a1 = 0;
alert(a1);			// 0
anotherExample(a1);
alert(a1); 			// 0

// By Reference
var o = {};
function propSet(val) {
	o.prop = val;
}

function changeVal(obj) {
	obj.prop = 6;
	obj.changedBy = "changeVal";
}

propSet(5);
alert(o.prop)

alert(obj.prop);
alert(obj.changedBy);

// Everything is an object
({}) instanceof Object;				// true
([]) instanceof Object;				// true
(function() {}) instanceof Object;	// true

function Presentation() {
	this.isAwesome = true;
}

alert((new Presentation()) instanceof Object); // true
alert((new Presentation()) instanceof Presentation); // true
alert(Object.hasOwnProperty('isAwesome')); // false

Object.isAwesome = "true?";
alert(Object.hasOwnProperty('isAwesome')); // true

// Closures
function getCallCount() {
	var count = 0;
	return function() { alert(++count); };
}
var callCount = getCallCount();
callCount();
callCount();

// Creating "private" elements
function Widget(name) {
	var _origName = name,
		widgetName = "VTCC." + name;

	this.notAccessible = "Oh Noes!";
	
	var getId = function() {
		return name + "_" + (new Date()).getMilliseconds();
	};

	return {
		id: getId(),
		getName: function(orig) { 
			return orig ? _origName : widgetName; 
		}
	};
}

var myWidget = new Widget("Calendar");

alert(myWidget.notAccessible); // undefined
alert(myWidget.id); // Calendar_123
alert(myWidget.getName(true)); // Calendar
alert(myWidget.getName()); // VTCC.Calendar

alert(typeof getId); // undefined
alert(typeof _origName); // undefined

// this

// 1
alert(this); // the Window/Global NS

var myWidget = {
  name: "AwesomeWidget",
  echo: function() {
    alert(this.name);
  }
};

myWidget.echo();
myWidget['echo'].call(myWidget);

// 2
var myObj = {};

function clickCallback() {
  this.someProp = "somePropVal";
}

clickCallback(), alert(window.someProp);
clickCallback.call(myObj), alert(myObj.someProp);

// scoped
function outer() {
  var outerVar = 1;

  function inner() {
    var innerVar = 10;

    return function() {
      return innerVar + outerVar;
    }
  }

  return inner();
}

var runOuter = outer();
alert(runOuter());

// Won't create scope with if/else/while/for
function woot() {
  if(true) {
  	var b = 3;
  }

  alert(typeof b); // var b exists in woot(), not 'if'
}

// mutability
function addAnother(args) {
  for (property in args) {
    this[property] = args[property];
  }
}

var o = {
  prop: "val"
};

alert(o["prop"], o.prop);

addAnother.call(o, {another: "val2"});

alert(o.another);

delete o.another;

alert(typeof o.another);

Array.prototype.clear = function() {
  this.length = 0;
  return this;
}

console.log([1,2,3].clear());

Object.prototype.isArray = function(o) {
  return (this.prototype.toString.call(o) === '[object Array]');
}
Object.isArray({}); // false
Object.isArray([]); // true

APP.util.array = (function() {

  // Dependencies
  var ao = APP.util.objects;

  var arrToStr = '[object Array]',
      toStr = Object.prototype.toString;

  // Private Functions

  // Return Public API
  return {
    isArray: function(arr) {
      return toStr.call(a) === arrToStr;
    }
  };

})();

APP.util.array = (function() {

  // Dependencies

    // Private Members
  var arrToStr = '[object Array]',
    toStr = Object.prototype.toString,

    // Private Functions
    _isArray = function(arr) {
      return toStr.call(a) === arrToStr;
    };

  // Return Public API
  return {
    isArray: _isArray
  };

})();

(function( $ ){
  $.fn.myPluginName = function() {
    // your plugin logic
  };
})( jQuery );

define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  // Do stuff

  return ThisObject;
});

// Prototypes
function Person(name) {
  this.name = name;
  this.sayName = function() {
    return alert(this.name);
  };
}

var p1 = new Person("John");
var p2 = new Person("Jane");

alert(p1.sayName === p2.sayName);

function Person() {  
}

Person.prototype.name = "John";
Person.prototype.sayName = function() {
  return alert(this.name);
};

var p1 = new Person();
var p2 = new Person();

alert(p1.sayName === p2.sayName);

class Shape {
  // public, static, private
}

class Circle extends Shape {
  // radius, area, etc
}

function Shape() {}
Shape.prototype.name = "Awesome Shape";

function Circle() {}
Circle.prototype = new Shape();

var c = new Circle();

alert(c.name); // "Awesome Shape"

module math {
  export function sum(x, y) {
    return x + y;
  }
  export var pi = 3.141593;
}

import {sum, pi} from math;
alert(sum(pi,pi));

class Point extends Base {
  constructor(x,y) {
    super();
    this[px] = x, this[py] = y;
    this.r = function() { return Math.sqrt(x*x + y*y); }
  }
  get x() { return this[px]; }
  get y() { return this[py]; }
  proto_r() { return Math.sqrt(this[px] * this[px] +
      this[py] * this[py]); }
  equals(p) { return this[px] === p[px] &&
      this[py] === p[py]; }
}

// Default variables
function f(x, y=1, z=0) {}

// Iterators
for (var [key, val] of items(x)) { alert(key + ',' + val); }

// Rest
function g(i, j, ...r) { return r.slice(i, j); }