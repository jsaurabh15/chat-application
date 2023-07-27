const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");


const app =  express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connection established");
}).catch((error) => {
    console.log(error.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
})