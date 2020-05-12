const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")

const usersRouter = require("./users/users-router")
const authRouter = require("./auth/auth-router")
const restricted = require("./middleware/restrict")
const knexSessionStore = require("connect-session-knex")(session)

const server = express()
const port = process.env.PORT || 4000

const sessionConfig = {
	name: "sugar",
	secret: "Don't tell nothing, don't tell nothing",
	cookie: 
		{
			maxAge: 3600 * 1000,
			secure: false, // in production this should be true
			httpOnly: true, // no access from JS
		},
	resave: false,
	saveUninitialized: true, // For compliance with GDPR
	store: new knexSessionStore({
		knex: require("./data/config.js"),
		tableName: "sessions",
		sidfieldname: "sid",
		createTable: true,
		clearInterval: 3600 * 1000
	})
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use("/api/users", restricted, usersRouter)
server.use("/api/auth", authRouter)

server.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong. Cannot provide more information.",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})

module.exports = server