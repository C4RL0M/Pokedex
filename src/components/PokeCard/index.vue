<template>
  <div :id="id" class="card text-center shadow" style="height: 266px; margin-bottom: 10px; border-radius: 10px;">
    <img
      v-if="currentSrc === null"
      class="placeholder mx-auto"
      :src="require('@/assets/img/pokeball.png')"
      :alt="name"
    />
    <router-link v-else :to="{ name:'pokemon', params: { id } }" >
      <img class="rounded mx-auto" :src="image" :alt="name" />
    </router-link>
    <div class="card-body" style="font-size: 14px; font-weight: 700;" >
      <router-link
        v-if="id > 0"
        class="card-title"
        :to="{ name:'pokemon', params: { id } }"
      >
        {{ name }}
      </router-link>
      <div class="codigo">
        <small style="font-size: 9px; color: black; font-weight: 700;">Cód: {{ id }}</small>
      </div>
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
</template>

<style>
.card-title {
    font-size: 1.17em;
    text-decoration: none;
    color: black;
}
.codigo{
  margin-top: 8px;
}
.type{
  margin-top: 55px !important;
}
</style>
<script src="./index.js"></script>