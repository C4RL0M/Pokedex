<template>
  <div class="">
    <SearchBar v-if="resultsList" :results="resultsList" />
    <h1 style="font-size: 14px; font-weight: 700; margin: 41px 20px 35px 67px;">
      Pokémons
    </h1>
    <div class="row" style="justify-content: center;">
      <div
        v-for="(p, idx) in pokemonList"
        v-bind:key="idx"
        class="col-md-3"
        style="width: 18% !important; margin-bottom: 31px;"
      >
        <PokemonCard v-if="pokedex.has(p.name)" v-bind="pokedex.get(p.name)" />
        <PokemonCard v-else v-bind="loading(p.name)" />
      </div>
      <div v-if="pokemonList.length > 0 && pokemonList.length < maxPokemon" class="text-center mb-3">
      <button class="btn btn-outline-dark" @click="fetchMorePokemon()">Load more Pokemon</button>
    </div>
    </div>
  </div>
</template>

<style>
/* .scroll::-webkit-scrollbar{
  width: 12px;
  border: 1px solid #E5E5E5;
}
.scroll::-webkit-scrollbar-thumb{
  background-color: #E5E5E5;
  border-radius: 6px;
}
.scroll{
  margin-top: 140px !important;
  margin-bottom: 80px !important;
  width: 100%;
  max-width: 1385px;
  height: 800px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 2%;
  overflow-y: scroll;
}  */
</style>
<script src="./index.js"></script>