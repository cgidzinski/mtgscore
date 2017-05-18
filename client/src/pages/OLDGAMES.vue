<template>
    <div>
        <div class="container" v-if="gameStatus == 0">
            <div class="row">
                <div class="col-md-8">
                    <div class="jumbotron ">
                        <h1>Avaliable Players!</h1>
                        <input type="text" class="form-control" v-model="search" placeholder="Search Player Name">
                        <div v-if="search.length >= 2">
                            <br>
                            <ul class="list-group">
                                <li class="list-group-item" v-for="player in avaliablePlayersFiltered " v-on:click="addPlayer(player)">{{player.name}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="jumbotron ">
                        <h1>Added Players!</h1>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="player in addedPlayers" v-on:click="removePlayer(player)">{{player.name}}</li>
                        </ul>
                        <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="gameStatus = 1" v-if="addedPlayers.length>1">Start Game</button>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="row text-center" v-if="gameStatus == 1">
            <div v-for="player in addedPlayers">
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
            <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="endGame()">End Game</button>
        </div>
        <!--  -->
                <div v-if="gameStatus == 2">
            <div v-for="player in addedPlayers">
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
                gameStatus: 0,
                search: '',
                avaliablePlayers: [],
                addedPlayers: [],
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
        computed: {
            avaliablePlayersFiltered: function() {
                var self = this
                return self.avaliablePlayers.filter(function(user) {
                    return user.name.toLowerCase().indexOf(self.search.toLowerCase()) !== -1
                })
            }
        },
        created: function() {
            this.getPlayers();
        },
        methods: {
            getPlayers: function() {
                //
                var that = this;
                axios.get('http://localhost:8088/api/getPlayers/name').then(function(response) {
                    that.avaliablePlayers = response.data.players;
                }).catch(function(error) {
                    console.log(error);
                });
                //
            },
            addPlayer: function(player) {
                var found = false;
                for (var i = this.addedPlayers.length - 1; i >= 0; i--) {
                    if (this.addedPlayers[i].name == player.name) {
                        found = true;
                    }
                }
                if (found == false) {
                    this.addedPlayers.push({
                        'name': player.name,
                        'points': [],
                        'stats': [40, 0, 0, 0]
                    })
                }
            },
            removePlayer: function(player) {
                for (var i = this.addedPlayers.length - 1; i >= 0; i--) {
                    if (this.addedPlayers[i].name == player.name) {
                        this.addedPlayers.splice(i, 1)
                    }
                }
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
            endGame: function() {
                for (var i = 0; i < this.addedPlayers.length; i++) {
                    var totalPoints = 0;
                    var place = 0;
                    if (this.addedPlayers[i].points.length != 0) {
                        for (var j = this.addedPlayers[i].points.length - 1; j >= 0; j--) {
                            totalPoints += this.addedPlayers[i].points[j].value
                            if (this.addedPlayers[i].points[j].name == "First Place") {
                                place = 1
                            }
                            if (this.addedPlayers[i].points[j].name == "Second Place") {
                                place = 2
                            }
                            if (this.addedPlayers[i].points[j].name == "Third Place") {
                                place = 3
                            }
                        }
                    }
                    this.addedPlayers[i].totalPoints = totalPoints
                        //
                    var that = this;
                    axios.post('http://localhost:8088/api/updateplayer', {
                        'name': that.addedPlayers[i].name,
                        'points': totalPoints,
                        'place': place
                    }).then(function(response) {
                        that.playerList = response.data.addedPlayers;
                        that.gameStatus = 2;
                    }).catch(function(error) {
                        console.log(error);
                    });
                    //
                }
                
            }
        }
}
</script>
