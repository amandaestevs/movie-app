const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/user_lists/:id", async (req, res) => {
   const userID = req.params.id;
   try {
     const lists = await User.find({_id: userID}).select("lists");
     res.status(200).json(lists)
   } catch (err) {
    res.status(400).json(err.message);
   }
})

router.get("/:list/:id", async (req, res) => {
  const userID = req.params.id;
  const list = req.params.list;
  try {
    switch (list) {
      case "favorites":
        const favList = await User.find({ _id: userID }).select("favorites"); 
        res.status(200).json(favList);
        break;
      case "watchlist":
        const watchlist = await User.find({ _id: userID }).select("watchlist");
        res.status(200).json(watchlist);
        break;
      default:
        const specificList = await User.find({ _id: userID, "lists.name": list}).select("lists.items.$");
        res.status(200).json(specificList);
    } 
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/new_list/:id", async (req, res) => {
  const userID = req.params.id;
  const name = req.body.list;
  try {
    const list = await User.findOneAndUpdate({_id: userID}, {$addToSet: {lists: {name, items: []}}})
    res.status(200).json(list)
  } catch (err) {
    res.status(400).json(err.message)
  }
})

router.post("/new_item/:id", async (req, res) => {
  const userID = req.params.id;
  const item = req.body.item;
  const list = req.body.list;

  try {
    switch (list) {
      case "favorites":
        const favList = await User.findOneAndUpdate({ _id: userID }, {$addToSet: {favorites: item}});
        res.status(200).json(favList);
        break;
      case "watchlist":
        const watchlist = await User.findOneAndUpdate({ _id: userID }, {$addToSet: {watchlist: item}});
        res.status(200).json(watchlist);
        break;
      default:
        const specificList = await User.findOneAndUpdate({_id: userID, "lists.name": list}, {$addToSet: {"lists.$.items": item}})
        res.status(200).json(specificList);
    }
  } catch (err) {
    res.status(400).json(err.message); 
  }
});

router.delete("/delete_item/:id", async (req, res) => {
  const userID = req.params.id;
  const {list, itemID} = req.query;

  try { 
    switch (list) {        
      case "favorites":
        await User.findOneAndUpdate({_id: userID}, {$pull: {favorites: {id: Number(itemID)}}}, {'new': true})
        res.status(200).json('deleted');   
        break;
      case "watchlist":
        await User.findOneAndUpdate({ _id: userID }, {$pull: {watchlist: {id: Number(itemID)}}}, {'new': true});
        res.status(200).json('deleted');
        break;
      default:
        await User.findOneAndUpdate({ _id: userID}, 
          {$pull: {"lists.$[elem].items": {"id": Number(itemID)}}}, {arrayFilters: [{"elem._id": list}],'new': true});
        res.status(200).json('deleted');
    } 
  } catch (err) {
    res.status(400).json(err.message);
  }
})

router.delete("/delete_list/:id", async (req, res) => {
   const userID = req.params.id;
   const listID = req.query.list;

   try {
     await User.findOneAndUpdate({_id: userID}, {$pull: {lists: {_id: listID}}}, {'new': true})
     res.status(200).json('deleted')
   } catch (err) { 
     res.status(400).json(err.message); 
   }
}) 

module.exports = router;
