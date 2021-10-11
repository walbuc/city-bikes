import keys from "../config/keys";

module.exports = (io, bikesService, redisHistoryClient) => {
  io.on("connection", (socket) => {
    if (!bikesService.emitData.isRunning()) {
      bikesService.emitData.start();
    }

    redisHistoryClient.lrange("dates", 0, -1, (err, dates) => {
      socket.emit("dates-re-play", dates);
    });

    socket.on("re play start", (date, index) => {
      redisHistoryClient.lrange("dates", index, -1, (err, datesRage) => {
        datesRage.forEach((date, indexDate) => {
          redisHistoryClient.lrange(date, 0, -1, (err, data) => {
            if (data) {
              for (let i = 0; i < data.length; i++) {
                setTimeout(function () {
                  socket.emit("re play data", date, JSON.parse(data[i]));
                  if (datesRage.at(-1) === date) {
                    if (i === data.length - 1) {
                      console.log("entro en stop");
                      socket.emit("re play stop", date, JSON.parse(data[i]));
                    }
                  }
                }, (i + 1) * (indexDate + 1) * keys.requestInterval);
              }
            }
          });
        });
      });
    });

    socket.on("disconnect", (reason) => {
      if (!io.engine.clientsCount) {
        bikesService.emitData.stop();
      }
    });
  });

  return io;
};
