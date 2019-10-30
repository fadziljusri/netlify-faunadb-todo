<template>
  <div id="app" class="container py-3">
    <h2 class="fs-h2 text-center">Serverless Todo app</h2>
    <!-- <h2 class="fs-h2 text-center">Netlify + FaunaDB</h2> -->

    <div class="nav text-center mt-3">
      <router-link to="/">Todos</router-link>
      <router-link to="/about">About</router-link>
    </div>

    <div class="main-content mt-5">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

