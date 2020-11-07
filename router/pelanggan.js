const express = require("express")
const app = express()

//call model for pelanggan
const pelanggan = require ("../models/index").pelanggan

//midleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req,res) => {
    pelanggan.findAll({
        include: ["tarif"]
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
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
        id_tarif: req.body.id_tarif,
    }

    //execute insert data
    pelanggan.create(data)
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
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
        id_tarif: req.body.id_tarif,
    }

    //key yang menunjukan data yang akan dirubah
    let param = {
        id_pelanggan: req.body.id_pelanggan
    }

    //execute update data
    pelanggan.update(data,{where : param})
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

app.delete("/:pelanggan", async(req,res) => {
    let pelanggan = req.params.id_pelanggan
    let id_pelanggan = {
        id_pelanggan: id_pelanggan
    }

    //execute delete data
    pelanggan.destroy({where : param})
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