import { interval } from "../utils/functions";
import keys from "../config/keys";

module.exports = function BikesSerivceFactory(
  name,
  bikesController,
  io,
  redisHistoryClient
) {
  function getCurrentDate() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    return date;
  }

  class BikesService {
    constructor(name, bikesController, io, redisHistoryClient) {
      this.name = name;
      this.bikesController = bikesController;
      this.io = io;
      this.redisClient = redisHistoryClient;

      this.emitData = new interval(
        this.emitBikesInfoByName(this.name),
        keys.requestInterval
      );
    }
    emitBikesInfoByName(name) {
      return async () => {
        try {
          const res = await this.bikesController.getByName(name);

          const currentDate = getCurrentDate();

          this.redisClient.lindex("dates", -1, (err, value) => {
            if (value !== currentDate) {
              this.redisClient.rpush(
                "dates",
                currentDate,
                function (err, reply) {
                  redisHistoryClient.lrange("dates", 0, -1, (err, dates) => {
                    console.log(dates, "DATES");
                    io.emit("dates-re-play", dates);
                  });
                }
              );
            }
          });

          this.redisClient.rpush(
            currentDate,
            JSON.stringify(res),
            function (err, reply) {
              console.log(reply);
            }
          );

          this.io.emit("list bikes", res);
        } catch (error) {
          this.io.emit("list bikes error", error);
        }
      };
    }
  }

  return new BikesService(name, bikesController, io, redisHistoryClient);
};
