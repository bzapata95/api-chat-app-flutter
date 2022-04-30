const Message = require("../models/Message");
const User = require("../models/User");

const userConnected = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = true;

  await user.save();

  return user;
};

const userDisconnected = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = false;

  await user.save();

  return user;
};

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload);
    await message.save();
  } catch (error) {
    return false;
  }
};

module.exports = {
  userConnected,
  userDisconnected,
  saveMessage,
};
