var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// define the schema for our user model
var playerSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    points: { type: Number, default: 0 },
    place1: { type: Number, default: 0 },
    place2: { type: Number, default: 0 },
    place3: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
})
var Player = mongoose.model('Player', playerSchema);

module.exports = {
    Player: Player
};
