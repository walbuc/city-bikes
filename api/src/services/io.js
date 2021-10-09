module.exports = (io, bikesService) => {
  io.on("connection", (socket) => {
    if (!bikesService.emitData.isRunning()) {
      bikesService.emitData.start();
    }

    socket.on("disconnect", (reason) => {
      if (!io.engine.clientsCount) {
        bikesService.emitData.stop();
      }
    });
  });

  return io;
};
