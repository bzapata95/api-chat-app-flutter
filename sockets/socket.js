const {
  userConnected,
  userDisconnected,
  saveMessage,
} = require("../controllers/socket.controller");
const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  //console.log(client.handshake.headers); // Cabezeras de la conexion
  const token = client.handshake.headers["x-token"];
  const [result, uid] = comprobarJWT(token);

  // verify authentication
  if (!result) {
    return client.disconnect();
  }

  // Client connected
  userConnected(uid);

  // Escuchar el mensaje personal
  client.on("send-message", async (payload) => {
    // TODO: guardar mensaje
    await saveMessage(payload);

    io.to(payload.to).emit("send-message", payload);
  });

  // Ingresar al usuario a una sala
  client.join(uid);

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    userDisconnected(uid);
  });
});
