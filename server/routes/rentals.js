const express = require('express')
const router = express.Router()
const Rental = require('../model/rental')
const UserCtrl = require('../controllers/user')

router.get('/secret',UserCtrl.authMiddlewate, (req,res)=>{
    res.json({secret:true})
})

router.get('',(req, res)=>{
    Rental.find({}, (err , rentals)=>{
        if(err){
            res.status(422).send({errors: [{title:'Rental Error!', detail: 'Algo anduvo mal'}]})
        }
        res.json(rentals)
    })
})

router.get('/:id', (req, res)=>{
    const id = req.params.id

    Rental.findById(id, (err , foundRental)=>{
        if(err){
            res.status(422).send({errors: [{title:'Rental Error!', detail: 'Could not find Rental!'}]})
        }

        res.json(foundRental)
    })
})

module.exports = router