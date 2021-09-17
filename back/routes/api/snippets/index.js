const express = require('express');
const router = express.Router();
const {getAll, getById, addOne, updateById, deleteById} = require('./model');

router.get('/', async (req, res) => {
  try{
    let rows = await getAll();
    res.status(200).json(rows);

  }catch(ex){
    res.status(500).json({"msg":"Error"});
  }
});

router.get('/byid/:id', async (req, res)=>{
  try{
    let {id} = req.params;
    let row = await getById(id);
    res.status(200).json(row);
  }catch(ex){
    res.status(500).json({"msg":"Error"});
  }
});

router.post('/new', async (req, res) => {
  try {
    let { name, lastname, age, gender } = req.body
    let documentInserted = await addOne(name, lastname, age, gender);
    console.log(documentInserted);
    res.status(200).json(documentInserted);
  } catch (ex) {
    res.status(500).json({"msg":"Error"});
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    let { id } = req.params
    let {name, lastname, age, gender} = req.body; 
    let row = await updateById(id, name, lastname, age, gender);
    res.status(200).json(row);
  } catch (ex) {
    res.status(500).json({"msg":"Error"});
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    let { id } = req.params
    let row = await deleteById(id);
    res.status(200).json(row);
  } catch (ex) {
    res.status(500).json({"msg":"Error"});
  }
});

module.exports = router;