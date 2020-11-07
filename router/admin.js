const express = require("express")
const app = express()

//call model for admin
const admin = require ("../models/index").admin

//midleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req,res) => {
    admin.findAll({
        include: ["level"]
    }) 
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
        username: req.body.username,
        password: req.body.password,
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }

    //execute insert data
    admin.create(data)
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
        username: req.body.username,
        password: req.body.password,
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }

    //key yang menunjukan data yang akan dirubah
    let param = {
        id_admin: req.body.id_admin
    }

    //execute update data
    admin.update(data,{where : param})
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

app.delete("/:id_admin", async(req,res) => {
    let id_admin = req.params.id_admin
    let param = {
        id_admin: id_admin
    }

    //execute delete data
    rak.destroy({where : param})
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