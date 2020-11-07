const express = require("express")
const app = express()
const multer = require("multer") // untuk upload file
const path = require("path") // untuk memanggil path direktori
const fs = require("fs") // untuk manajemen file
const cors = require("cors")
const moment = require("moment")

//call model for pembayaran
const pembayaran = require ("../models/index").pembayaran

//midleware for allow the request from body
app.use(express.static(__dirname));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//konfigutasi upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set file storage
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        // generate file name 
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})


app.get("/", async(req,res) => {
    pembayaran.findAll({
        include: ["tagihan"]
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

app.post("/",upload.single("bukti"), async(req,res) => {
    //tampung data request yang akan dimasukan
    let data = {
        id_tagihan: req.body.id_tagihan,
        tanggal_pembayaran: moment().format('YYYY-MM-DD HH:mm:ss'),
        bulan_bayar: req.body.bulan_bayar,
        biaya_admin: req.body.biaya_admin,
        total_bayar: req.body.total_bayar,
        status: req.body.status,
        bukti: req.file.filename,
        id_admin: req.body.id_admin,

    }

    if(!req.file) {
        res.json({
            message: "tidak ada file yang terkirim"
        })
    } else {

        //execute insert data
    pembayaran.create(data)
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
    }
    
})

app.put("/",upload.single("bukti") ,async(req,res) => {
    //tampung data request yang akan dirubah
    let data = {
        id_tagihan: req.body.id_tagihan,
        tanggal_pembayaran: moment().format('YYYY-MM-DD HH:mm:ss'),
        bulan_bayar: req.body.bulan_bayar,
        biaya_admin: req.body.biaya_admin,
        total_bayar: req.body.total_bayar,
        status: req.body.status,
        bukti: req.file.filename,
        id_admin: req.body.id_admin,
    }

    //key yang menunjukan data yang akan dirubah
    let param = {
        id_pembayaran: req.body.id_pembayaran
    }

    //execute update data
    pembayaran.update(data,{where : param})
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

app.delete("/:pembayaran", async(req,res) => {
    let pembayaran = req.params.id_pembayaran
    let id_pembayaran = {
        id_pembayaran: id_pembayaran
    }

    //execute delete data
    pembayaran.destroy({where : param})
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