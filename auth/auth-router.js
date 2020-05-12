const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")

const router = express.Router()

router.post("/register", (req, res, next) => {
    const userData = req.body

    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userData.password, ROUNDS)

    userData.password = hash;

    Users.add(userData)
        .then(saved => {
            res.status(200).json({saved})
        })
        .catch(next)
})

router.post("/login", (req, res, next) => {
    const { username, password } = req.body

    Users.findBy({username})
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    id: user.id,
                    username: user.username
                }

                res.status(200).json({ 
                    hello: `${user.username}! Welcome!`
                })
            } else {
                res.status(401).json({ 
                    message: "You shall not pass!" 
                })
            }
        })
        
        .catch(next)
        // .catch(error => {
        //     res.status(500).json({
        //         message: "Cannot find user."
        //     })
        // })
        
    })

router.get("/logout", (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.send("Unable to logout.")
            } else {
            res.status(200).json({ 
                message: "You've been logged out." 
            })}
        })
    }
})
  

module.exports = router