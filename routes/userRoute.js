const express = require("express");
const UserModel = require("../model/User");
const router = express.Router();


// create new user in database
// http://localhost:3000/new-user
router.post("/users", async (req,res) => {
    try{
        const users = req.body;

        const result = await UserModel.create(users);
        
        console.log(result);
        res.status(201).send("User/s has been created");
    }catch(err){
        console.error(`Error: ${err}`);
        res.status(500).send(err);
    };
});

// retrieves all users
// http://localhost:3000/users
router.get("/user-list", async (req,res) => {
    try{
        console.log("Retrieving all users...")
        const user = await UserModel.find({});

        console.log(user);
        res.status(200).send(user);
    }catch(err){
        console.error(`Error: ${err}`);
        res.status(500).send(err);
    };
});

// delete all users
// http://localhost:3000/delete
router.delete("/delete", async (req,res) => {
    try{
        console.log("Deleting all users...")
        const user = await UserModel.deleteMany({});

        console.log(user);
        res.status(200).send("Users has been deleted");
    }catch(err){
        console.error(`Error: ${err}`);
        res.status(500).send(err);
    };
});

module.exports = router