<template>
    <div>
        <h1>Tally - {{id}}</h1>
        <br>
        <div class="row text-center">
            <div v-for="player in players">
                <div class="card">
                    <h3 class="card-header">{{ player.player.name }}</h3>
                    <div class="card-block">
                        <h1>Place: {{player.place}}</h1> Life: {{ player.stats[0] }}
                        <br> Infect: {{ player.stats[1] }}
                        <br> C.Dam: {{ player.stats[2] }}
                        <br> C.Death: {{ player.stats[3] }}
                        <br>
                        <h1>Points: {{player.totalPoints}}</h1>
                        <div v-for="point in player.points"> {{point.name}} [{{point.value}}] </div>
                        <br> </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
            return {
                id: '',
                players: []
            }
        },
        created: function() {
            this.loadGame();
        },
        methods: {
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
                    if (that.finished == true) {
                        that.$router.replace('/tally/' + that.id)
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
}
</script>
