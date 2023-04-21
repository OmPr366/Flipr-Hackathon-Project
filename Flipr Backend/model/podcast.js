const mongoose = require("mongoose");


const podcastSchema = new mongoose.Schema({
    
    title :{
        type: String,
        required: true,

    },
    description :{
        type: String,
    },
    image :{
        type: String,
    },
    category :{
        type: String,
    },
    type :{
        type: String,
        required: true,
    },
    fileUrl :{
        type: String,
        required: true,
    },
    authorName :{
        type: String,
    },



})

const Podcast = mongoose.model('Game', podcastSchema);

module.exports = Podcast;
