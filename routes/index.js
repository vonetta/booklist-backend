"use strict";
const express = require("express");
const router = express.Router();

const path = require("path");
const contentPath = path.join(__dirname, "../../content");
module.exports = router;
router.use(express.static(contentPath));


const bookApiPrefix = "/api/books";
const userApiPrefix = "/api/users";
const bookRoutes = require("./bookRoutes")(bookApiPrefix);
const userRoutes = require("./userRoutes")(userApiPrefix)
//API Prefixes

router.use(bookApiPrefix, bookRoutes);
router.use(userApiPrefix, userRoutes)
useAPIErrorHandlers(router);

function useAPIErrorHandlers(router) {
  // Handle API 404
  router.use("/api/*", (req, res, next) => {
    res.sendStatus(404);
  });
  // Handle API 500
  router.use((err, req, res, next) => {
    if (!err) {
      return next();
    }
    // Log it
    console.log(err.stack);

    // Redirect to error page
    res.sendStatus(500);
  });
}
