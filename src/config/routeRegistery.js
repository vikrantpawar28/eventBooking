
const eventBookingSystem = (app) => {
  app.use(
    "/auth",
    require("../app/auth/authRoutes")
  );

  app.use(
    "/events",
    require("../app/event/eventRoutes")
  );

  app.use(
    "/booking",
    require("../app/booking/bookingRoutes")
  );
};

const routes = {
  eventBookingSystem,
};

module.exports = routes[process.env.PROJ_NAME];