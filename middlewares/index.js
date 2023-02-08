module.exports = (req, res, next) => {
  res.sendResult = (code, result) => {
    if (code === 0) res.json({code, data: result});
    else res.json({code, msg: result});
  };
  next();
};