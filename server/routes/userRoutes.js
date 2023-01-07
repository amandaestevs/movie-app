const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.get('/favorites/:id', async (req, res) => {
  const userId = req.params.id;
   try {
    const favList = await User.find({_id: userId}).select('favorites');
    res.status(200).json(favList)
   } catch (err) {
     res.status(400).json(err.message)
   }
})

router.post('/favorites/:id', async (req, res) => {       
   const userId = req.params.id;
   const movieToAdd = req.body;     
   try {
    const movie = await User.findOneAndUpdate({_id: userId}, {$addToSet: {favorites: movieToAdd}})
    res.status(200).json(movie)
   } catch (err) {
     res.status(400).json(err.message)
   }
})


module.exports = router;