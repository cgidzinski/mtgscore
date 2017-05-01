<template>
    <div id="app">
        <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse  navbar-fixed-top">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
            <router-link to="/" class="navbar-brand">MTG Score</router-link>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/scoreboard" class="nav-link">Scoreboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/games" class="nav-link">Games</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/players" class="nav-link">Players</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
