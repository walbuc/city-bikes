import { interval } from "../utils/functions";
import keys from "../config/keys";

module.exports = (io, bikesService, redisHistoryClient) => {
  io.on("connection", (socket) => {
    if (!bikesService.emitData.isRunning()) {
      bikesService.emitData.start();
    }

    redisHistoryClient.lrange("dates", 0, -1, (err, dates) => {
      socket.emit("dates-re-play", dates);
    });

    socket.on("reply date", (date, index) => {
      redisHistoryClient.lrange("dates", index, -1, (err, datesRage) => {
        datesRage;
      });

      redisHistoryClient.lrange(date, 0, -1, (err, data) => {
        if (data) {
          console.log(data, "con data!!!!!!!!!");

          socket.emit("reply data start");

          for (let i = 0; i < data.length; i++) {
            setTimeout(function () {
              console.log(data[i]);
              socket.emit("reply data", date, data[i]);

              if (i === data.length - 1) {
                socket.emit("reply end", date, data[i]);
              }
            }, data[i] * keys.requestInterval);
          }
        }
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
