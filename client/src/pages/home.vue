<template>
    <div>
    
 <div class="jumbotron" v-if="noRanks">
            <h1>No Top Scores Yet!</h1>
            <p> <strong>
        Go Play Some Games!
      </strong> </p>
        </div>

    <div v-if="!noRanks" class="jumbotron">
        <h1>Top Players</h1>
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
        <br>
        </div>
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
                noRanks:true,
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
                    if (that.players.length > 0 && that.players[0].points > 0){
                    	that.noRanks = false;
                    }
                }).catch(function(error) {
                    console.log(error);
                });
                //
            }
        }
}
</script>
