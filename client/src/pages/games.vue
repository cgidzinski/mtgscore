<template>
    <div>
        <h1>Game</h1>
        <div v-if="!gameEnded">
            <div v-if="!gameStarted">
                <br>
                <h2>Avaliable Players:</h2>
                <ul class="list-group">
                    <li class="list-group-item" v-for="player in playerList" v-on:click="addPlayer(player)">{{player.name}}</li>
                </ul>
                <br>
                <h2>Added Players:</h2>
                <ul class="list-group">
                    <li class="list-group-item" v-for="player in players" v-on:click="removePlayer(player)">{{player.name}}</li>
                </ul>
                <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="gameStarted = !gameStarted" v-if="players.length>1">Start Game</button>
            </div>
            <div class="row text-center" v-if="gameStarted">
                <div v-for="player in players">
                    <div class="card">
                        <h3 class="card-header" data-toggle="modal" data-target="#pointsModal" v-on:click="selectedPlayer=player">{{ player.name }}</h3>
                        <div class="card-block">
                            <h1 v-on:click="changeDisplay()">{{displays[displayIndex]}}: {{ player.stats[displayIndex] }}</h1>
                            <br>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-danger btn" v-on:click="changeValue(player,-5)">-5</button>
                                <button type="button" class="btn btn-danger btn" v-on:click="changeValue(player,-1)">-1</button>
                                <button type="button" class="btn btn-success btn" v-on:click="changeValue(player,+1)">+1</button>
                                <button type="button" class="btn btn-success btn" v-on:click="changeValue(player,+5)">+5</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-group" role="group" v-if="gameStarted">
                <button type="button" class="btn btn-success btn-lg" v-on:click="endGame()">End Game</button>
                <button type="button" class="btn btn-danger btn-lg" v-on:click="restartGame()">Restart Game</button>
            </div>
        </div>
        <div v-if="gameEnded">
            <div v-for="player in players">
                <h3>{{player.name}} [{{player.totalPoints}}]</h3>
                <ul>
                    <li v-for="item in player.points">{{item.name}} [{{item.value}}]</li>
                </ul>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="pointsModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Points For {{selectedPlayer.name}}</h5>
                        <button type="button" class="close" data-dismiss="modal"> <span>&times;</span> </button>
                    </div>
                    <div class="modal-body">
                        <div v-for="pCat in pointsCatagories">
                            <p>
                                <button type="button" class="btn btn-primary" v-on:click="selectedPlayer.points.push(pCat)">{{pCat.name}} [{{pCat.value}}]</button>
                            </p>
                        </div>
                    </div>
                    <div v-for="points in selectedPlayer.points"> {{points.name}} [{{points.value}}] </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
            return {
                gameStarted: false,
                gameEnded: false,
                endGameStats: [],
                playerList: [],
                players: [],
                selectedPlayer: '',
                displayIndex: 0,
                displays: ['Life', 'Infect', 'C.Dam', 'C.Death'],
                pointsCatagories: [{
                    'name': 'First Place',
                    "value": 3
                }, {
                    'name': 'Second Place',
                    "value": 2
                }, {
                    'name': 'Third Place',
                    "value": 1
                }, {
                    'name': 'First Blood',
                    "value": 1
                }, {
                    'name': 'Search Over 30 Seconds',
                    "value": -1
                }]
            }
        },
        created: function() {
            this.getPlayers();
        },
        methods: {
            restartGame: function() {
                for (var i = this.players.length - 1; i >= 0; i--) {
                    this.players[i].points = [];
                    this.players[i].stats = [40, 0, 0, 0];
                }
            },
            endGame: function() {
                for (var i = 0; i < this.players.length; i++) {
                    var totalPoints = 0;
                    var place = 0;
                    if (this.players[i].points.length != 0) {
                        for (var j = this.players[i].points.length - 1; j >= 0; j--) {
                            totalPoints += this.players[i].points[j].value
                            if (this.players[i].points[j].name == "First Place") {place = 1}
                                if (this.players[i].points[j].name == "Second Place") {place = 2}
                                    if (this.players[i].points[j].name == "Third Place") {place = 3}
                        }
                    }
                    this.players[i].totalPoints = totalPoints
                       //
                var that = this;
                axios.post('http://localhost:8088/api/updateplayer', {
                    'name': that.players[i].name,
                    'points': totalPoints,
                    'place': place
                }).then(function(response) {
                    that.playerList = response.data.players;
                }).catch(function(error) {
                    console.log(error);
                });
                //
                }
                this.gameEnded = true;
            },
            //
            changeValue: function(player, val) {
                this.$set(player.stats, this.displayIndex, player.stats[this.displayIndex] += val)
            },
            changeDisplay: function() {
                if (this.displayIndex < 3) {
                    this.displayIndex += 1;
                } else {
                    this.displayIndex = 0;
                }
            },
            getPlayers: function() {
                //
                var that = this;
                axios.get('http://localhost:8088/api/getplayers/name').then(function(response) {
                    that.playerList = response.data.players;
                }).catch(function(error) {
                    console.log(error);
                });
                //
            },
            addPlayer: function(player) {
                for (var i = this.playerList.length - 1; i >= 0; i--) {
                    if (this.playerList[i].name == player.name) {
                        this.playerList.splice(i, 1)
                        this.players.push({
                            'name': player.name,
                            'points': [],
                            'stats': [40, 0, 0, 0]
                        })
                    }
                }
            },
            removePlayer: function(player) {
                for (var i = this.players.length - 1; i >= 0; i--) {
                    if (this.players[i].name == player.name) {
                        this.players.splice(i, 1)
                        this.playerList.push({
                            'name': player.name
                        })
                    }
                }
            },
        }
}
</script>
