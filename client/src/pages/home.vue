<template>
    <div>
        <div class="jumbotron">
            <h1>MTG Score Tracker</h1>
            <p> <strong>
        Track Points and Wins!
      </strong> </p>
        </div>
        <h1>Top Points Players</h1>
        <section class="row text-center">
            <div class="col" v-for="player in players" v-if="player.rank == 1"> <img src="http://www.come-on-baby-poker.com/images/1st.gif" class="img-fluid" width="200" height="200">
                <h4>{{player.name}}</h4>
                <div class="text-muted">{{player.points}}</div>
            </div>
            <div class="col" v-for="player in players" v-if="player.rank == 2"> <img src="http://www.come-on-baby-poker.com/images/2nd.gif" class="img-fluid" width="200" height="200">
                <h4>{{player.name}}</h4>
                <div class="text-muted">{{player.points}}</div>
            </div>
            <div class="col" v-for="player in players" v-if="player.rank == 3"> <img src="http://www.come-on-baby-poker.com/images/3rd.gif" class="img-fluid" width="200" height="200">
                <h4>{{player.name}}</h4>
                <div class="text-muted">{{player.points}}</div>
            </div>
        </section>
        <br> </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
            return {
                players: []
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
