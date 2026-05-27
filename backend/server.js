const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors') // cross orgigin resource sharing
require('dotenv').config();

const ticketRoutes = require('./routes/ticketroutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ticketDB')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ticketDB')
    .then(()=>console.log("MongoDB Connected"))
    .catch(err=>console.log(err));

app.use('/api/tickets', ticketRoutes)

const PORT = process.env.PORT|| 5000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));


