const db = require('./index');

exports.initDatabase = async (req, res, next) => {
  try {
    const connection = await db.connection();
    const queryStr = "CREATE TABLE `users`(" +
      "`id` INT PRIMARY KEY auto_increment," +
      "`username` VARCHAR(20) NOT NULL UNIQUE COMMENT '用户名'," +
      "`password` VARCHAR(200) NOT NULL," +
      "`type` CHAR(10) NOT NULL," +
      "`avatar_url` VARCHAR(2083)," +
      "`position` VARCHAR(50)," +
      "`info` TEXT," +
      "`company` VARCHAR(50)," +
      "`salary` DECIMAL(8,2)," +
      "`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
      "`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);";
    const result = await connection.query(queryStr);
    await connection.release();
    res.send(result);
  } catch (e) {
    res.send(e.message);
  }
};