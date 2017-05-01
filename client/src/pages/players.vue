<template>
    <div>
        <h1>Players</h1>
        <div v-for="player in players">
            <div class="card">
                <h3 class="card-header">{{ player.name }}</h3>
                <div class="card-block"> Points: {{player.points}}<br> 
                Games Played: {{player.gamesPlayed}}<br>
                1st's: {{player.place1}}<br>
                 2nd's: {{player.place2}}<br>
                  3rd's: {{player.place3}}<br>



                 </div>
            </div>
            <br> </div>
        <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="newPlayerModal()">New Player</button>
        <!--  -->
        <div class="modal fade" id="newPlayerModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">New Player</h5>
                        <button type="button" class="close" data-dismiss="modal"> <span>&times;</span> </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group"> <span class="input-group-addon">Name</span>
                            <input type="text" class="form-control" v-model="newPlayerName"> </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="newPlayer()">Add Player</button>
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
                players: [],
                newPlayerName: ''
            }
        },
        created: function() {
            this.loadPlayers();
        },
        methods: {
            newPlayerModal: function() {
                $('#newPlayerModal').modal('show')
            },
            newPlayer: function() {
                $('#newPlayerModal').modal('hide')
                    //
                var that = this;
                axios.post('http://localhost:8088/api/newPlayer', {
                    'name': that.newPlayerName
                }).then(function(response) {
                    that.newPlayerName = '';
                    that.loadPlayers();
                }).catch(function(error) {
                    console.log(error);
                });
                //
            },
            loadPlayers: function() {
                //
                var that = this;
                axios.get('http://localhost:8088/api/getplayers/name').then(function(response) {
                    that.players = response.data.players;
                }).catch(function(error) {
                    console.log(error);
                });
                //
            }
        }
}
</script>
