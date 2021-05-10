var Chance = require('chance');
var chance = new Chance();

console.log("Voici " + chance.prefix() + " " + chance.animal() + " qui vient de " + chance.city())