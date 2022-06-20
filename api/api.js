const express = require("express");
const router = express.Router();
const fs = require("fs");
const database = require("mongodb").MongoClient;

const url = `mongodb://localhost:27017/geolocation`

router.get("/", (req, res) => {
     return res.status(200).send({
        message: "Hello World"
     });
})

router.post("/",(req,res)=>{
  
    database.connect(url,(err,clint)=>{
        if(err) console.log(`db error > `,err);

        console.log(`mongodb connected!`);

        const db = clint.db("geolocation");

        let created = false;
        db.collection("location").insertOne(req.body).then(res => {
            created = res.acknowledged;
        });

        return res.status(201).send({
             created : created
        })
    })
})

module.exports = router;