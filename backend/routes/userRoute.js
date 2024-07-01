const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age,
        });
        res.status(200).json(userAdded);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//getting sinle user
router.get("/:id", async (req, res) => {
    const {id}=req.params;
    try {
        const SingleUser = await User.findById({_id:id});
        res.status(200).json(SingleUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Deleting  user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const SingleUser = await User.findByIdAndDelete({ _id: id });
        res.status(200).json(SingleUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//PUt/patch users
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const {name, email, age}=req.body;
    try {
        const UpdateUser = await User.findByIdAndUpdate(id, req.body,{ new:true});
        res.status(200).json(UpdateUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
