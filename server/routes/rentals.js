const express = require('express')
const router = express.Router()
const Rental = require('../model/rental')

router.get('',(req, res)=>{
    res.json({'ok':true})
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