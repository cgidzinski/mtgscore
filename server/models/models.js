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
// define the schema for our game model
var gameSchema = new mongoose.Schema({
    players: [{
    _id : false ,
    player: { type: ObjectId, ref: 'Player' },
    totalPoints: { type: Number, default: 0 },
    place: { type: Number, default: 0 },
    points: { type: Array, default: [] },
    stats: { type: Array, default: [40, 0, 0, 0] }
    }],





    date: { type: Date, default: Date.now() },
    finished: { type: Boolean, default: false },
})
var Game = mongoose.model('Game', gameSchema);
module.exports = {
    Player: Player,
    Game: Game
};
