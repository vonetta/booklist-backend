const router = require("express").Router();

const booksControllerFactory = require("../controllers/books.controller");
const booksApiPrefix = "/api/books";

module.exports = apiPrefix => {
  const booksController = booksControllerFactory(apiPrefix);

  router.get("/", booksController.getBooks);
  router.post("/", booksController.create);
  router.delete("/:id", booksController.removeBook);
  router.put("/:id", booksController.editBook);
  return router;
};
