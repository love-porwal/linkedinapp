const express = require("express");
const { PostModel } = require("../models/post.schema")


const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    const posts = await PostModel.find()
    res.send(posts)
})

//create

postRouter.post("/create", async (req, res) => {
    const payload = req.body
    const post = new PostModel(payload)
    await post.save()
    res.send({ "msg": "Post Created sucessfully" })
})

//Delete
postRouter.delete("/delete/:id", async (req, res) => {
    const postID = req.params.id;
    const post = await PostModel.findOne({ "_id": postID })
    const userID_post = post.userID
    const userID_req = req.body.userID
    try {
        if (userID_req !== userID_post) {
            res.send({ "msg": "You are not Authorized" })
        } else {
            await PostModel.findByIdAndDelete({ _id: postID })
            res.send({ "msg": `Post with id${postID} has been Deleted` })
        }
    }
    catch (error) {
        res.send({ "msg": "Unable to delete post", "error": error.message })
    }
})

//Update
postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const postID = req.params.id;
    const post = await PostModel.findOne({ "_id": postID })
    const userID_post = post.userID
    const userID_req = req.body.userID
    try {
        if (userID_req !== userID_post) {
            res.send({ "msg": "You are not Authorized" })
        } else {
            await PostModel.findByIdAndUpdate({ _id: postID }, payload)
            res.send({ "msg": `Post with id ${postID} has been Updated` })
        }
    }
    catch (error) {
        res.send({ "msg": "Unable to update post", "error": error.message })
    }
})
module.exports = {
    postRouter
}
