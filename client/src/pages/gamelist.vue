<template>
    <div>
        <h1>Games</h1>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Players</th>
                        <th>Finished</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in games" v->
                        <td>{{game.date}}</td>
                        <td>
                            <div v-for="player in game.players">{{player.player.name}}</div>
                        </td>
                        <td>{{game.finished}}</td>
                        <td><router-link :to="{ path : '/game/' + game._id}">Click</router-link></td>
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
                games: []
            }
        },
        created: function() {
            this.loadGames();
        },
        methods: {
            loadGames: function() {
                var that = this;
                axios.get('http://localhost:8088/api/getgames').then(function(response) {
                    that.games = response.data.games;
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
}
</script>
