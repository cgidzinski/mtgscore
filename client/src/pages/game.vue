<template>
    <div>
        <h1>Match - {{id}}</h1>
        <br>
        <div class="row text-center">
            <div v-for="player in players">
                <div class="card">
                    <h3 class="card-header" data-toggle="modal" data-target="#pointsModal" v-on:click="selectedPlayer=player">{{ player.player.name }}</h3>
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
        <!-- Modal -->
        <div class="modal fade" id="pointsModal" tabindex="-1" role="dialog" v-if="selectedPlayer">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Points For {{selectedPlayer.player.name}}</h5>
                        <button type="button" class="close" data-dismiss="modal"> <span>&times;</span> </button>
                    </div>
                    <div class="modal-body">
                        <div v-for="pCat in pointsCatagories">
                            <p>
                                <button type="button" class="btn btn-success" v-on:click="changePoints(selectedPlayer,pCat,false)">{{pCat.name}} [{{pCat.value}}]</button>
                                <button type="button" class="btn btn-alert" v-on:click="changePoints(selectedPlayer,pCat,true)">X</button>
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
                id: '',
                finished: false,
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
            this.loadGame();
        },
        methods: {
            //
            changePoints: function(player, points, remove) {
                if (remove == false) {
                    player.points.push(points)
                    this.updategame(player)
                } else {
                    for (var i = player.points.length - 1; i >= 0; i--) {
                        if (player.points[i].name == points.name) {
                            player.points.splice(i, 1);
                            this.updategame(player)
                        }
                    }
                }
            },
            changeValue: function(player, val) {
                this.$set(player.stats, this.displayIndex, player.stats[this.displayIndex] += val)
                this.updategame(player)
            },
            updategame: function(player) {
                var that = this;
                axios.post('http://localhost:8088/api/updategame', {
                    gameID: that.$route.params.id,
                    'player': player
                }).then(function(response) {}).catch(function(error) {
                    console.log(error);
                });
            },
            changeDisplay: function() {
                if (this.displayIndex < 3) {
                    this.displayIndex += 1;
                } else {
                    this.displayIndex = 0;
                }
            },
            loadGame: function() {
                var that = this;
                axios.get('http://localhost:8088/api/getgame', {
                    params: {
                        'id': that.$route.params.id
                    }
                }).then(function(response) {
                    that.id = response.data.game._id;
                    that.finished = response.data.game.finished;
                    that.players = response.data.game.players;
                    if (that.finished == true){that.$router.replace('/tally/' + that.id)}
                }).catch(function(error) {
                    console.log(error);
                });
            },
            endGame: function() {
                localStorage.clear();
                var that = this;
                axios.post('http://localhost:8088/api/endgame', {
                    gameID: that.id,
                    'players': that.players
                }).then(function(response) {
                    // that.$router.replace('/tally/' + that.id)
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
}
</script>
