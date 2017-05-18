<template>
    <div>
        <h1>Scoreboard</h1>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Points</th>
                        <th>1st's</th>
                        <th>2nd's</th>
                        <th>3rd's</th>
                        <th>Games Played</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="player in players">
                        <td>{{player.rank}}</td>
                        <td>{{player.name}}</td>
                        <td>{{player.points}}</td>
                        <td>{{player.place1}}</td>
                        <td>{{player.place2}}</td>
                        <td>{{player.place3}}</td>
                        <td>{{player.gamesPlayed}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            loadPlayers: function() {
                //
                var that = this;
                axios.get('http://localhost:8088/api/getplayers/points').then(function(response) {
                    that.players = response.data.players;
                }).catch(function(error) {
                    console.log(error);
                });
                //
            }
        }
}
</script>
