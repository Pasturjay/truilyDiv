const crypto = require('crypto');
const secretKey = crypto.randomBytes(34).toString('hex');
console.log(secretKey);
