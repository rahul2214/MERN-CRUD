const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connect success!");
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err);
            console.log("Running port successfully at ", process.env.PORT || 8000);
        });
    })
    .catch((err) => {
        console.log("Error connecting", err);
    });

app.use(userRoute);
