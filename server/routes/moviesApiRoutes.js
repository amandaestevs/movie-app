const express = require('express');
const axios = require('axios');
const router = express.Router();

 router.get('/trending', async (req, res) => {
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_KEY}`)
      const data = response.data;
      res.status(200).json(data)
  } catch (err) {
       res.status(400).json(err.message)
  }
 })

 router.get('/top_rated_movies', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}`)
    const data = response.data;
    res.status(200).json(data)
  } catch(err) {
    res.status(400).json(err.message)
  }
 })

 router.get('/top_rated_tv', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_KEY}`)
    const data = response.data;
    res.status(200).json(data)
  } catch(err) {
    res.status(400).json(err.message)
  }
 })

 router.get('/comedy', async (req, res) => {
     try {
       const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&sort_by=popularity.desc&with_genres=35`)
       const data = response.data;
       res.status(200).json(data)
     } catch(err) {
      res.status(400).json(err.message)
     }
 })

 router.get('/action', async (req, res) => {
     try {
       const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&sort_by=popularity.desc&with_genres=28`)
       const data = response.data;
       res.status(200).json(data)
     } catch(err) {
      res.status(400).json(err.message)
     }
 })

 router.get('/drama', async (req, res) => {
     try {
       const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&sort_by=popularity.desc&with_genres=18`)
       const data = response.data;
       res.status(200).json(data)
     } catch(err) {
      res.status(400).json(err.message)
     }
 })

 router.get('/documentary', async (req, res) => {
     try {
       const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&sort_by=popularity.desc&with_genres=99`)
       const data = response.data;
       res.status(200).json(data)
     } catch(err) {
      res.status(400).json(err.message)
     }
 })

 router.get('/search', async (req, res) => {
    const search = req.query.search;
    try {
      if(search === "" || search == null) return res.status(200).send([])
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_KEY}&query=${search}`)
      const data = response.data.results;
      res.status(200).json(data)
    } catch(err) {
      res.status(400).json(err.message)
    }   
 })

 router.get('/list', async (req, res) => {
    const listItems = req.query.listItems;
    if(listItems == null) return res.status(200).json("empty");
    
    try {
        const resultsArray = await Promise.all(listItems.map(async (item) => {
          if(!item.media_type){
            item.media_type = item.original_name ? 'tv' : 'movie';
          }
          const response = await axios.get(`https://api.themoviedb.org/3/${item.media_type}/${item.id}?api_key=${process.env.TMDB_KEY}`);
          const data = response.data;
          return data
        }))
      res.status(200).json(resultsArray);
    } catch(err) {
      res.status(400).json(err.message) 
    }
 })
 
 module.exports = router;