<template>
  <header class="_header">
    <div class="content">
      <router-link to="/">
        <img src="@/assets/img/Frame.svg">
      </router-link>
    </div>
  </header>  
</template>

<style>
._header {
  background-color: white;
  height: 60px;
}
.content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 18px;
}
</style>
<script src="./index.js"></script>