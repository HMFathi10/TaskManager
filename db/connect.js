const mongoose = require("mongoose");


const connectToDatebase = (url) => {
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => { console.log("Connected to Database..") })
        .catch((err) => { console.log(err) });
};

module.exports = connectToDatebase;