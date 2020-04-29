var express = require("express");
var router = express.Router();

var eventController = require("../controllers/eventControllers");
var userController = require("../controllers/userControllers");

router.get("/allevents", eventController.getAllEvents);
router.get("/tags", eventController.getEventByTag);

router.get(
  "/allevent/:userId",
  userController.requireSingin,
  eventController.getEventById
);
router.post(
  "/newevent/:userId",
  userController.requireSingin,
  eventController.newEvent
);
router.put(
  "/editevent/:eventId",
  userController.requireSingin,
  eventController.isEventer,
  eventController.editevent
);
router.delete(
  "/deleteevent/:eventId",
  userController.requireSingin,
  eventController.isEventer,
  eventController.deleteEvent
);

// any route containing userId, our app will first execute userById()
router.param("userId", userController.userById);
// any route containing userId, our app will first execute userById()
router.param("eventId", eventController.eventById);

module.exports = router;
