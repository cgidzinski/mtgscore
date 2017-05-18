var DB = require('../models/models');
module.exports = function(app) {
    app.get('/api/getgames', function(req, res) {
        DB.Game.find({}).populate('players.player').sort([
            ['date', 'descending']
        ]).exec(function(error, games) {
            res.json({ success: true, games: games });
        })
    });
    app.get('/api/getgame', function(req, res) {
        DB.Game.findOne({ '_id': req.query.id }).populate('players.player').exec(function(error, game) {
            res.json({ success: true, game: game });
        })
    });
    app.post('/api/updategame', function(req, res) {
        DB.Game.findOne({ '_id': req.body.gameID }).exec(function(error, game) {
            if (!game) {
                res.json({ success: false });
                return;
            }
            for (var i = game.players.length - 1; i >= 0; i--) {
                if (game.players[i].player == req.body.player.player._id) {
                    game.players[i] = req.body.player
                    game.save()
                    res.json({ success: true });
                }
            }
        })
    });
    app.post('/api/endgame', function(req, res) {
        DB.Game.findOne({ '_id': req.body.gameID }).populate('players.player').exec(function(error, game) {
            if (!game) {
                res.json({ success: false });
                return;
            }
            //
            for (var i = game.players.length - 1; i >= 0; i--) {
                console.log(game.players[i])
                for (var k = game.players[i].points.length - 1; k >= 0; k--) {
                    game.players[i].totalPoints += game.players[i].points[k].value
                }
                game.players[i].player.points += game.players[i].totalPoints;
                game.players[i].player.save()
            }
            //
            //
            /////Place and save
            //
            //
            game.finished = true;
            game.save()
            res.json({ success: true });
            //
        })
    });
    //
    app.get('/api/getplayers/name', function(req, res) {
        DB.Player.find({}).sort([
            ['name', 'ascending']
        ]).exec(function(error, players) {
            res.json({ success: true, players: players });
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
    app.post('/api/newGame', function(req, res) {
        var players = req.body.players;
        if (!players) {
            res.json({ success: false });
            return;
        }
        var newGame = new DB.Game()
        for (var i = players.length - 1; i >= 0; i--) {
            newGame.players.push({
                'player': players[i].id
            })
        }
        newGame.save();
        res.json({ success: true, data: newGame });
    });
}
