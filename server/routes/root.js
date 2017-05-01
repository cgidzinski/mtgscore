var DB = require('../models/models');
module.exports = function(app) {
    // app.get('/', function(req, res) {
    //     res.sendFil("Server Working!")
    // });
    app.get('/api/getplayers/name', function(req, res) {
        DB.Player.find({}).sort([
            ['name', 'ascending']
        ]).exec(function(error, players) {
            res.json({ success: true, players: players });
        })
    });
    app.post('/api/updateplayer', function(req, res) {
        DB.Player.findOne({ 'name': req.body.name }).exec(function(error, player) {
            player.points += req.body.points
            player.gamesPlayed += 1
            if (req.body.place == 1) { player.place1 += 1 }
            if (req.body.place == 2) { player.place2 += 1 }
            if (req.body.place == 3) { player.place3 += 1 }
            player.save()
            res.json({ success: true, player: player });
        })
    });
    app.get('/api/getplayers/points', function(req, res) {
        var lastRank = 0;
        var lastScore = 0;
        var rankedPlayers = []
        DB.Player.find({}).sort([
            ['points', 'descending']
        ]).exec(function(error, players) {
            for (var i = 0; i < players.length; i++) {
                if (players[i].points != lastScore) {
                    lastRank += 1;
                }
                var player = JSON.parse(JSON.stringify(players[i]));
                player.rank = lastRank
                rankedPlayers.push(player)
                lastScore = players[i].points;
            }
            res.json({ success: true, players: rankedPlayers });
        })
    });
    app.post('/api/newplayer', function(req, res) {
        var playerName = req.body.name;
        if (!playerName) {
            res.json({ success: false });
            return;
        }
        var newPlayer = new DB.Player()
        newPlayer.name = req.body.name;
        newPlayer.points = 0;
        newPlayer.save();
        res.json({ success: true, player: newPlayer });
    });
}
