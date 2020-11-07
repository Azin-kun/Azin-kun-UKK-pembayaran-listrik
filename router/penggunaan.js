const express = require("express")
const app = express()

//call model for penggunaan
const penggunaan = require ("../models/index").penggunaan

//midleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req,res) => {
    penggunaan.findAll({
        include: ["pelanggan"]
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
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }

    //execute insert data
    penggunaan.create(data)
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
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }

    //key yang menunjukan data yang akan dirubah
    let param = {
        id_penggunaan: req.body.id_penggunaan
    }

    //execute update data
    penggunaan.update(data,{where : param})
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

app.delete("/:penggunaan", async(req,res) => {
    let penggunaan = req.params.id_penggunaan
    let id_penggunaan = {
        id_penggunaan: id_penggunaan
    }

    //execute delete data
    penggunaan.destroy({where : param})
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