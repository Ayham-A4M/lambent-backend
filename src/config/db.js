const { default: mongoose } = require('mongoose');
require('dotenv').config();

const DATA_BASE_CONNECTION = () => {
    mongoose.connect(process.env.DATA_BASE_URI).then(() => {
        console.log("connected complete !!")
    }).catch(err => {
        console.log(err);
    })
}
module.exports = DATA_BASE_CONNECTION