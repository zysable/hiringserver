const db = require("../db");
exports.getChatMsg = async (data, io) => {
  const {sid, rid, content} = data;
  console.log(content);
  const chat_id = [sid * 1, rid * 1].sort((a, b) => a - b).join('_');
  let connection;
  try {
    connection = await db.connection();
    let queryStr = "INSERT INTO chats (`id`, `sid`, `rid`, `chat_id`, `content`) VALUES(NULL, ?, ?, ?, ?)";
    let binding = [sid, rid, chat_id, content];
    await connection.query(queryStr, binding);
    queryStr = "SELECT * FROM `chats` WHERE `chat_id` = ? ORDER BY `created_time` DESC LIMIT 1";
    binding = [chat_id]
    const [chatMsg] = await connection.query(queryStr, binding);
    io.emit('receiveMsg', {code: 0, chatMsg});
  } catch (e) {
    io.emit('receiveMsg', {code: 1, error: '发送消息失败！'});
  } finally {
    if (connection) await connection.release();
  }
};