//const express = require("express")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")

const router = require("express").Router()

router.get("/", restrict(), (req, res, next) => {
	Users.find()
		.then(users => {
			res.json(users)
		})
		.catch(next)
})

module.exports = router