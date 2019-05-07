"use strict";

const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

function getAllBooks() {
  return conn
    .db()
    .collection("books")
    .find({ dateDeactivated: null })
    .toArray()
    .then(result => result)
    .catch(err => Promise.reject(err));
}

function create(model) {
  const doc = {
    bookName: model.bookName,
    totalPages: model.totalPages,
    currentPage: model.currentPage,
    dateStarted: model.dateStarted,
    dateDeactivated: null
  };

  return conn
    .db()
    .collection("books")
    .insertOne(doc)
    .then(result => {
      result.insertedId.toString();
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function removeBook(id) {
  const doc = {
    $set: {
      dateDeactivated: new Date()
    }
  };
  return conn
    .db()
    .collection("books")
    .updateOne({ _id: ObjectId(id) }, doc)
    .then(result => result)
    .catch(err => console.log(err));
}

function editBook(model) {
  console.log(model);
  const doc = {
    $set: {
      bookName: model.bookName,
      totalPages: model.totalPages,
      currentPage: model.currentPage,
      dateStarted: model.dateStarted,
      dateDeactivated: model.dateDeactivated
    }
  };
  return conn
    .db()
    .collection("books")
    .updateOne({ _id: ObjectId(model._id) }, doc)
    .then(result => result)
    .catch(err => console.log(err));
}
module.exports = {
  create: create,
  getAllBooks: getAllBooks,
  removeBook: removeBook,
  editBook: editBook
};
