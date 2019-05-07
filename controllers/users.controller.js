"use strict"

const usersService = require("../services/users.service")

let _apiPrefix;

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix;
    return {
        create: create,
        login: login
    }
}

async function login(req, res) {
    try {
        let user = await usersService.login(req.body)
        return res.status(201).json(user)
    }
    catch (err) {
        return res.status(500).send(err)

    }
}

async function create(req, res) {
    try {
        let user = await usersService.create(req.body)
        return res.status(201).json(user)
    }
    catch (e) {
        return res.status(500).send(e)
    }
}