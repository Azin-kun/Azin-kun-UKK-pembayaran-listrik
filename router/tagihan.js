const express = require("express")
const app = express()

//call model for tagihan
const tagihan = require ("../models/index").tagihan

//midleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req,res) => {
    tagihan.findAll({
        include: ["penggunaan"]
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
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumalah_meter: req.body.jumalah_meter,
        status: req.body.status,

    }

    //execute insert data
    tagihan.create(data)
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
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: req.body.jumlah_meter,
        status: req.body.status,
    }

    //key yang menunjukan data yang akan dirubah
    let param = {
        id_tagihan: req.body.id_tagihan
    }

    //execute update data
    tagihan.update(data,{where : param})
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

app.delete("/:tagihan", async(req,res) => {
    let tagihan = req.params.id_tagihan
    let id_tagihan = {
        id_tagihan: id_tagihan
    }

    //execute delete data
    tagihan.destroy({where : param})
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