const crypto = require('crypto');

exports.hash = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return salt + ':' + derivedKey.toString('hex');
};

exports.verify = (newPass, hash) => {
  const [salt, key] = hash.split(':');
  const newKey = crypto.scryptSync(newPass, salt, 64);
  return key === newKey.toString('hex');
};