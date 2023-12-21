const app = require("express")();
const config = require("./config/config");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const PORT = config.server.port;

app.use("/hi", (req, res) => {
  try {
    return res.send("Hello all!");
  } catch (e) {
    return res.send("someting went wrong");
  }
});

let registerUsers = [];
let availableGroup = [];

function isUserAvailable(data) {
  let idx = registerUsers.findIndex((item) => item.email === data);
  return idx;
}

function isgroupAvailable(data) {
  let idx = availableGroup.findIndex((item) => item.inputData === data);
  return idx;
}

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    if (data.type == "single") {
      let idx = isUserAvailable(data.inputData);
      console.log(data, "Hello Room data!!!!!!", registerUsers);
      if (idx != -1) {
        let userId = data.userId + registerUsers[idx].id;
        socket.join(userId);
        io.emit("joinToChat", registerUsers[idx]);
      } else {
        io.emit("joinToChat", {
          error: true,
          message: `User with ${data.inputData} does not exist!`,
        });
      }
    } else {
      if (!io.sockets.adapter.rooms.get(data.inputData)) {
        socket.join(data.inputData);
        console.log("sivammmmmmmmmmm1");
        // console.log(io.sockets.adapter.rooms.get(data.inputData),"sivammmmmmmmmmm");
        io.emit("groupLimit", {
          msg: "NA",
          limitExceed: false,
        });
      } else {
        let roomSize = io.sockets.adapter.rooms.get(data.inputData).size;
        if (roomSize > 1) {
          io.emit("groupLimit", {
            msg: "Group limit exceeded! cannot joint more than 2 members",
            limitExceed: true,
          });
        } else {
          socket.join(data.inputData);
          console.log("sivammmmmmmmmmm2");
          io.emit("groupLimit", {
            msg: "NA",
            limitExceed: false,
          });
        }
      }
      console.log(
        io.sockets.adapter.rooms.get(data.inputData).size,
        "room size",
        io.sockets.adapter.rooms.get(data.inputData)
      );
      if (isgroupAvailable(data.inputData) == -1) {
        availableGroup.push(data);
        io.emit("user-joined", { info: data, availableGroup: availableGroup });
      }
      // }
    }
  });

  socket.on("getGroup", () => {
    io.emit("getGroup", availableGroup);
  });

  socket.on("register", (data) => {
    let idx = isUserAvailable(data.email);
    if (idx == -1) {
      registerUsers.push(data);
      console.log(registerUsers, "Login!!");
      io.emit("isUserAvailable", { isUserAvailable: true });
    } else {
      io.emit("isUserAvailable", { isUserAvailable: false });
    }
    console.log(data, "register User data", registerUsers);
  });

  socket.on("message", (data) => {
    console.log(data, "Message Data from angular");
    io.in(data.sendTo).emit("new message", data);
    // io.in(data.sendTo).emit("updateTyping", data);
  });

  socket.on("typing", (data) => {
    console.log(data, "Hello typing data");
    socket.broadcast.in(data.sendTo).emit("typing", data);
  });

  socket.on("offTyping", (data) => {
    console.log(data, "offTyping data");
    io.in(data.sendTo).emit("offTyping", data);
  });

  socket.on("leave-group", (data) => {
    socket.leave(data.inputData);
    io.in(data.inputData).emit("leaveGroup", data);
  });

  socket.on("logout", (data) => {
    let idx = isUserAvailable(data.email);
    if (idx > -1) {
      registerUsers.splice(idx, 1);
      io.emit("logout", data);
      console.log(registerUsers, "Logout!");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
