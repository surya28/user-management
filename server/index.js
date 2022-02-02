const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('connected to DB check')
    });

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);

app.listen(5000, () => {
    console.log('Up and running')
})