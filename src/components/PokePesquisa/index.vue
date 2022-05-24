<template>
  <div style="justify-content: center; display: flex; margin-top: 55px">
    <div v-if="notFound" class="text-center">
      <h1>Pokémon not found :(</h1>
      <button
        @click="$router.push({ name: 'home' })"
        class="btn btn-outline-dark"
      >
        Go back
      </button>
    </div>
    <div v-else-if="!loaded" class="row mt-5">
      <div class="col mt-5">
        <img
          class="placeholder-large img-fluid mx-auto d-block"
          style="
             {
              max-width: 300px;
              max-height: 300px;
            }
          "
          :src="require('@/assets/img/pokeball-large.png')"
          :alt="name"
        />
      </div>
    </div>
    <div v-else class="_card">
      <div class="">
        <div class="container1">
          <img
            class="img-fluid mx-auto mt-4 d-block"
            style="width: 150px"
            :src="image"
            :alt="name"
          />
          <strong style="margin-top: 10px">{{ name }}</strong>
          <div class="type">
            <small>
              <span
                v-for="(type, idx) in types"
                v-bind:key="idx"
                :class="'badge badge-type rounded-pill text-white ' + type"
              >
                {{ type.toUpperCase() }}
              </span>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="justify-content: center; display: flex; margin-top: 17px">
    <div class="_card">
      <div class="title">
        <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 15px">
          Habilidades
        </h4>
        <div class="separador"></div>
        <p style="font-size: 12px; font-weight: 400; margin-top: 4px">
          {{ pokedexEntry }}
        </p>
      </div>
    </div>
  </div>
  <div></div>
  <div class="voltar">
    <a class="_ticket:link" @click="$router.push({ name: 'home' })"> Voltar </a>
  </div>
</template>

<style>
._card {
  justify-content: center;
  display: flex;
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-width: 745px;
  height: 322px;
}
.container1 {
  text-align: center;
}
.type {
  margin-top: 33px;
}
.title {
  text-align: center;
  margin-top: 15px;
}
.separador {
  width: 100%;
  border-top: 1px solid #f1f4f5;
  list-style-type: none;
}
.voltar {
  margin-top: 48px;
  text-align: center;
  color: #00a3ff;
  font-weight: 700;
  font-size: 17px;
}
</style>
<script src="./index.js"></script>
