require("dotenv").config();
const PORT = 8000;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());

mongoose.connect(process.env.DB_KEY, {useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on("error", () => console.log("error"));     
db.once("open", () => console.log("connected"));

const movies = require('./routes/moviesApiRoutes'); 
app.use('/movies', movies);  

const auth = require('./routes/authRoutes');
app.use('/auth', auth);

const userInfo = require('./routes/userRoutes');
app.use('/user', userInfo);

app.listen(PORT);