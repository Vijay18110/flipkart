const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categorymodel = require('../model/Categorymodel')
const app = express();
const connect = mongoose.connect("mongodb://127.0.0.1:27017/MyDB");
connect.then(() => {
    console.log("connection done");
});
connect.catch(() => {
    console.log("connection not done");
});
app.use(cors());
app.use(express.json());

app.get("/category", async (req, res) => {
    const re = await categorymodel.find();
    res.json(re);
});
app.get("/category/:id", async (req, res) => {
    const re = await categorymodel.find({ _id: req.params.id });
    res.json(re);
});
app.post("/category", async (req, res) => {
    const re = new categorymodel({
        categoryname: req.body.categoryname,
    });
    await re.save();
    res.json({ msg: "record saved" });
});
app.delete("/category", async (req, res) => {
    const re = await categorymodel.findOneAndDelete({ _id: req.body.cid });
    res.json({ msg: "record delete" });
});
app.put("/category", async (req, res) => {
    const re = await categorymodel.findByIdAndUpdate(
        { _id: req.body.cid },
        {
            categoryname: req.body.categoryname,
        }
    );
    await re.save();
    res.send({ msg: "record update" });
});
app.listen(7000, () => {
    console.log("backend started");
});