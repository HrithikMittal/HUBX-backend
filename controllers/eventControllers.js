var Event = require("../modals/Event");
var _ = require("underscore");

const getAllEvents = (req, res) => {
  Event.find()
    .then((events) => {
      if (!events) res.send("No Event is there sorry");
      res.send(events);
    })
    .catch((err) => {
      console.log("Error is ", err.message);
    });
};

const newEvent = (req, res) => {
  var newEvent = new Event(req.body);
  newEvent.tags = req.body.tags.split(",");
  newEvent.eventedBy = req.profile;
  newEvent.createdDate = Date.now();
  console.log(newEvent);
  newEvent
    .save()
    .then((response) => {
      res.send({ message: "Event saved successfully and is ", resp: response });
    })
    .catch((err) => {
      console.log("Error is ", err.message);
    });
};

const editevent = (req, res) => {
  var event = req.event;
  event = _.extend(event, req.body);
  if (req.body.tags) {
    event.tags = req.body.tags.split(",");
  }
  event.updated = Date.now();
  event.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(event);
  });
};

const deleteEvent = (req, res) => {
  let event = req.event;
  console.log(event);
  event
    .remove()
    .then((event) => {
      res.send({ Message: "Deleted Event successfully", event: event });
    })
    .catch((err) => {
      console.log("Error is ", err.message);
    });
};

const isEventer = (req, res, next) => {
  let isEventer =
    req.event && req.auth && req.event.eventedBy._id == req.auth._id;
  if (!isEventer) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

const eventById = (req, res, next, id) => {
  Event.findById(id).exec((err, event) => {
    if (err || !event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }
    req.event = event; // adds event object in req with event info
    next();
  });
};

const getEventById = (req, res) => {
  var eventedBy = { _id: null };
  eventedBy._id = req.profile._id;
  var obj = {
    eventedBy,
  };
  Event.find(obj)
    .then((events) => {
      res.json({ events: events });
    })
    .catch((err) => {
      console.log("Error is ", err.message);
    });
};

const getEventByTag = async (req, res) => {
  var response = [];
  var tag = req.body.tag.split(",");
  await Event.find().then(async (event) => {
    await tag.map(async (singletag) => {
      await event.forEach(async (event) => {
        if (event.tags.includes(singletag)) {
          await response.push(event);
        }
      });
    });
  });
  var returnval = _.uniq(response, function (x) {
    return x._id;
  });
  res.send(returnval);
};

module.exports = {
  getAllEvents,
  newEvent,
  editevent,
  deleteEvent,
  eventById,
  isEventer,
  getEventByTag,
  getEventById,
};
