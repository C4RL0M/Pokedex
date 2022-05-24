import Pokedex from "../components/Pokedex/index.vue";
import Pokemon from "../components/PokePesquisa/index.vue";
import Error404 from "../components/Error404.vue";

export default [
  { 
    path: "/",
    name: "home", 
    component: Pokedex 
  },
  { 
    path: "/pokemon/:id",
    name: "pokemon", 
    component: Pokemon, 
    props: true 
  },
  { 
    path: "/:pathMatch(.*)*",
    name: "404",  
    component: Error404 
  },
];
