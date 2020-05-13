const Users = require("./users-model")
const restrict = require("../middleware/restrict")

const router = require("express").Router()

// Sean Kirby's version
// router.get("/", (req, res, next) => {
// 	Users.find()
// 		.then(users => {
// 			res.json(users)
// 		})
// 		.catch(error => res.send(error))
// 	}
// )

// module.exports = router


// JASON's version
router.get("/", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

module.exports = router