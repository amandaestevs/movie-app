const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name: String,
   email: {
    type: String,
    required: true
   },
   password: {
    type: String, 
    required: true
   },
   favorites: {
      type: Array, 
      default: []
   },
   watchlist: {
      type: Array, 
      default: []
   },
   lists: [{name: String, items: {type: Array, default: []}}]
})

const User = mongoose.model("User", UserSchema);
module.exports = User;