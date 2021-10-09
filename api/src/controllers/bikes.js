module.exports = function BikesControllerFactory(client) {
  class BikesController {
    constructor(client) {
      this.client = client;
    }

    async getByName(name) {
      try {
        const data = await this.client(name);
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }

  return new BikesController(client);
};
