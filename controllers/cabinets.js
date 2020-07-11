const express = require('express');
const router = express.Router();

const Cabinet = require('../models/cabinets.js');






// index
router.get('/', (req, res)=>{
    Cabinet.find({}, (error, allCabinets)=>{
    res.render('index.ejs', {
        cabinets: allCabinets
    })
    })
})

  // new
router.get('/new', (req, res) => {
    res.render('new.ejs');
})

  // post
router.post('/',  (req, res)=>{
    if(req.body.inStock === 'on'){ //if checked, req.body.inStock is set to 'on'
    req.body.inStock = true;
    } else { //if not checked, req.body.inStock is undefined
    req.body.inStock = false;
    }
    Cabinet.create(req.body, (error, createdCabinet)=>{
    res.redirect('/cabinets');
    })
})

  // edit
router.get('/:id/edit',  (req, res)=>{
    Cabinet.findById(req.params.id, (err, foundCabinet)=>{ //find the cabinet
        res.render('edit.ejs', {
          cabinet: foundCabinet //pass in found cabinet
        
        })
    })
})
  
  // update
  router.put('/:id',  (req, res)=>{
    if(req.body.inStock === 'on'){
        req.body.inStock = true;
    } else {
        req.body.inStock = false;
    }
    Cabinet.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=> {
      res.redirect('/cabinets');
    })
  })
  
  // show
  router.get('/:id',  (req, res) =>{
    Cabinet.findById(req.params.id, (err, foundCabinet)=>{
      res.render('show.ejs', {
        cabinet: foundCabinet,
        
      })
    })
  })
  
  // delete
  router.delete('/:id',  (req, res) => {
    Cabinet.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, data)=>{
      res.redirect('/cabinets') //redirect back to cabinets index
    })
  })
  
  module.exports = router;