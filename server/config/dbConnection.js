const mongoose = require("mongoose")
require("dotenv").config()

const URL = process.env.CONNECTIONSTRING

mongoose.connect(URL).then(res => console.log("Db connected.")).catch(err => console.log("Db conn err", err))