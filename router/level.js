const express = require("express")
const app = express()

//call model for level
const level = require ("../models/index").level

//midleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req,res) => {
    level.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", async(req,res) => {
    //tampung data request yang akan dimasukan
    let data = {
        nama_level: req.body.nama_level,
        
    }

    //execute insert data
    level.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", async(req,res) => {
    //tampung data request yang akan dirubah
    let data = {
        nama_level: req.body.nama_level
    }

    //key yang menunjukan data yang akan dirubah
    let param = {
        id_level: req.body.id_level
    }

    //execute update data
    level.update(data,{where : param})
    .then(result => {
        res.json({
            message: "data has been updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_level", async(req,res) => {
    let id_level = req.params.id_level
    let param = {
        id_level: id_level
    }

    //execute delete data
    level.destroy({where : param})
    .then(result => {
        res.json({
            message: "data has been destroyed",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app