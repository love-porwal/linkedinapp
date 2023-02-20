const express = require("express");
const app = express();

const cors = require("cors")
require("dotenv").config();

const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { postRouter } = require("./routes/post.route")
const { authenticate } = require("./middleware/authenticate")

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to Home Page")
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts", postRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to mongoAtlas")
    } catch (err) {
        console.log(err)
    }
    console.log(`port is running at ${process.env.port}`)
})