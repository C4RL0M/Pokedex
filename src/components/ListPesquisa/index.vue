<template>
<div class="drop">
  <input
    type="text"
    class="drop-input"
    placeholder="Pesquise por nome ou código"
    v-model="inputString"
    @keydown.down="onArrowDown"
    @keydown.up="onArrowUp"
    @keyup.enter="onEnter"
  />
  <div id="drop-list" v-show="inputString" class="drop-list shadow-lg rounded-3">
    <div
      v-for="(r, i) in filteredResults"
      :key="r.id"
      class="list-item"
      :class="i == arrowIndex ? 'active-item' : ''"
      @click="navigate(r.id)"
      @mouseover="onMouseOver(i)"
    >
      {{ r.name }} <span class="text-muted">&nbsp;({{ formatNumberId(r.id) }})</span>
    </div>
  </div>
</div>
</template>

<style>
.drop {
  position: relative;
  margin-top: 300px;
  width: 100%;
  height: 47.57px;
  max-width: 1172px;
  margin: 0 auto;
  z-index: 2000;
}
.drop-input {
  width: 100%;
  padding: 10px 16px;
  border-radius: 60px;
  border: 1px solid transparent;
  background: white;
  line-height: 1.5em;
  outline: none;
}
.drop-input:focus {
  background: #fff;
  border-color: #e2e8f0;
}
.drop-input::placeholder {
  opacity: 0.7;
}
.drop-list {
  position: absolute;
  width: 100%;
  max-height: 500px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
}
.list-item {
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
.list-item:hover {
  background: #edf2f7;
}
.active-item {
  background: #edf2f7;
}
</style>
<script src="./index.js"></script>