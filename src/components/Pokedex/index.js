import axios from "axios";
import PokemonCard from "./../PokeCard/index.vue";
import SearchBar from "./../ListPesquisa/index.vue";
import pokemonMixin from "@/mixins/pokemonMixin.js";

export default {
  name: "Pokedex",
  components: {
    PokemonCard,
    SearchBar,
  },
  mixins: [pokemonMixin],
  data() {
    return {
      pokemonList: [],
      resultsList: [],
      maxPokemon: 898,
      pokedex: new Map(),
    };
  },
  methods: {
    fetchPokemonList() {
      if (this.$pokedexCache.has("results")) {
        this.resultsList = this.$pokedexCache.get("results");
        this.pokemonList = this.$pokedexCache.get("list");
        this.fetchPokemonFromList();
      } else {
        axios
          .get("https://pokeapi.co/api/v2/pokemon?limit=" + this.maxPokemon)
          .then(({ data }) => {
            let results = data.results.map(p => {
              let arr = p.url.split('/');
              let id = parseInt(arr[arr.length - 2]);
              return {
                name: this.capitalizeString(p.name),
                url: p.url,
                id: id,
              };
            });
            this.resultsList = results;
            this.$pokedexCache.set("results", results);
            this.pokemonList = results.slice(0, 54);
            this.$pokedexCache.set("list", this.pokemonList);
            this.fetchPokemonFromList();
          }).catch(err => {
            console.log(err);
            this.fetchPokemonList(); // repeat call in case of error
          });
      }
    },
    fetchPokemonFromList() {
      this.pokemonList.forEach((p) => {
        if (!this.$pokedexCache.has(p.name)) {
          console.log(`fetching ${p.name}`);
          axios.get(p.url).then(({ data }) => {
            let pokemon = this.parsePokemon(data);
            if (pokemon.id <= this.maxPokemon) {
              this.$pokedexCache.set(p.name, pokemon);
              this.$pokedexCache.set(pokemon.id, p.name);
              this.pokedex.set(p.name, pokemon);
            }
          }).catch(err => {
            console.log(err);
            this.fetchPokemonFromUrl(p.url);
          });
        } else {
          this.pokedex.set(p.name, this.$pokedexCache.get(p.name));
        }
      });
    },
    loading(name) {
      let p = {
        id: 0,
        name: name,
        image: null,
        types: ["loading"],
      };
      return p;
    },
    fetchPokemonFromUrl(url) {
      axios.get(url).then(({ data }) => {
        let pokemon = this.parsePokemon(data);
        this.$pokedexCache.set(pokemon.name, pokemon);
        this.$pokedexCache.set(pokemon.id, pokemon.name);
        this.pokedex.set(pokemon.name, pokemon);
      }).catch(err => {
        console.log(err);
        this.fetchPokemonFromUrl(url);
      });
    },
    fetchMorePokemon() {
      const length = this.pokemonList.length;
      let morePokemon = this.resultsList.slice(length, length + 54);
      this.pokemonList = this.pokemonList.concat(morePokemon);
      this.$pokedexCache.set("list", this.pokemonList);
      this.fetchPokemonFromList();
    }
  },
  created() {
    this.fetchPokemonList();
  },
};