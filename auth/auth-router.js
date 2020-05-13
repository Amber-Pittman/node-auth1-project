const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")

const router = express.Router()

router.post("/register", (req, res, next) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 8)

    user.password = hash

    Users.add(user)
        .then(saved => {
            res.status(200).json({saved})
        })
        .catch(err => {
            res.status(500).json({
                message: "Problem with the DB", error: err
            })
        })
})

router.post("/login", (req, res) => {
    const {username, password} = req.body

    Users.findBy({username})        //lookup in the database
        // Make comparison between PW guess and actual PW
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = username
                res.status(200).json({
                    message: "Welcome!"
                })
            } else {
                res.status(401).json({
                    message: "Invalid credentials"
                })
            }
        }) 
        .catch(err => {
            res.status(500).json({
                message: "problem with the db", error: err
            })
        })
})

// Logout using GET
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send("Unable to logout.")
        } else {
            res.send("Logged out.")
        }
    })
})

module.exports = router