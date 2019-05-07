"use strict"

const mongodb = require("../mongodb")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

function login(model) {
    try {
        return conn
            .db()
            .collection("users")
            .findOne({ email: model.email })
            .then(result => {
                bcrypt.compare(model.password, result.password, function (err, res) {
                    res
                })
                const token = jwt.sign({ _id: result._id }, 'jwtPrivateKey')

                return token
            })
    }
    catch (err) {
        return Promise.reject(err)
    }

}

async function create(model) {
    try {
        let salt = await bcrypt.genSalt(10)
        model.password = await bcrypt.hash(model.password, salt)
        console.log(salt)
        // Store hash in your password DB.
        const doc = {
            firstName: model.firstName,
            lastName: model.lastName,
            email: model.email,
            password: model.password,
            verified: model.verified,
            dateRegistered: model.dateRegistered
        }
        return conn
            .db().collection("users")
            .insertOne(doc)
            .then(result => {
                return result
            })
    }

    catch (e) {
        return Promise.reject(e)
    }

}

module.exports = {
    create: create,
    login: login
}