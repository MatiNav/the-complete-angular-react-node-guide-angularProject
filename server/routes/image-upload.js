const express = require('express')
const UserCtrl = require('../controllers/user')
const router = express.Router()
const upload = require('../services/image-upload')

const singleUpload = upload.single('image') // esto hace que en el body solo agarre la key image 

router.post('/image-upload', UserCtrl.authMiddleware, function (req,res){
    singleUpload(req, res, function(err){
        if(err){
            return res.status(422).send({errors:[{title:'Image Upload Error', description: err.message}]});
        }

        res.json({imageUrl: req.file.location});
    })


})

module.exports = router