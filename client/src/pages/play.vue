<template>
    <div>
        <div class="container">
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
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="startGame()" v-if="addedPlayers.length > 1">Start Game</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
            return {
                search: '',
                avaliablePlayers: [],
                addedPlayers: [],
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
            var gameID = localStorage.getItem("mtgCurrentGame");
            if (gameID) {
                this.$router.replace('/game/' + gameID)
            } else {
                this.getPlayers();
            }
        },
        methods: {
            getPlayers: function() {
                var that = this;
                axios.get('http://localhost:8088/api/getPlayers/name').then(function(response) {
                    that.avaliablePlayers = response.data.players;
                }).catch(function(error) {
                    console.log(error);
                });
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
                        'id': player._id,
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
            startGame: function() {
                var that = this;
                axios.post('http://localhost:8088/api/newGame', {
                    'players': that.addedPlayers
                }).then(function(response) {
                    localStorage.setItem("mtgCurrentGame", response.data.data._id);
                    that.$router.replace('/game/' + response.data.data._id)
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
}
</script>
