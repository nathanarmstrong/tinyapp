const bcrypt = require('bcrypt');

console.log(bcrypt.hashSync('asd', 10));
console.log(bcrypt.hashSync('1', 10));