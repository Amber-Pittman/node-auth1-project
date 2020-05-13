const Users = require("./users-model")
//const restrict = require("../middleware/restrict")

const router = require("express").Router()

router.get("/", (req, res, next) => {
	Users.find()
		.then(users => {
			res.json(users)
		})
		.catch(error => res.send(error))
	}
)

module.exports = router