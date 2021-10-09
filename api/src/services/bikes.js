import { interval } from "../utils/functions";
import keys from "../config/keys";
console.log(keys, "cooooon keeys");

module.exports = function BikesSerivceFactory(name, bikesController, io) {
  class BikesService {
    constructor(name, bikesController, io) {
      this.name = name;
      this.bikesController = bikesController;
      this.io = io;

      this.emitData = new interval(
        this.emitBikesInfoByName(this.name),
        keys.requestInterval
      );
    }

    emitBikesInfoByName(name) {
      return async () => {
        try {
          const res = await this.bikesController.getByName(name);
          console.log(res, "con res AAAAAAA");
          io.emit("list bikes", res);
        } catch (error) {
          io.emit("list bikes error", error);
        }
      };
    }
  }

  return new BikesService(name, bikesController, io);
};
