const express = require("express")
const app = express()

//call model for tarif
const tarif = require ("../models/index").tarif

//midleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req,res) => {
    tarif.findAll()
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh,
        
    }

    //execute insert data
    tarif.create(data)
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh,
    }

    //key yang menunjukan data yang akan dirubah
    let param = {
        id_tarif: req.body.id_tarif
    }

    //execute update data
    tarif.update(data,{where : param})
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

app.delete("/:id_tarif", async(req,res) => {
    let id_tarif = req.params.id_tarif
    let param = {
        id_tarif: id_tarif
    }

    //execute delete data
    tarif.destroy({where : param})
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