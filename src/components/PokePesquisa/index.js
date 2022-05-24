import axios from "axios";
import pokemonMixin from "@/mixins/pokemonMixin.js";

export default {
  name: "Pokemon",
  props: {
    id: Number,
  },
  mixins: [pokemonMixin],
  data() {
    return {
      pokemon: {},
      notFound: false,
      maxPokemon: 898,
      loaded: false,
      currentSrc: null,
      pokedexEntry: "",
    };
  },
  computed: {
    name() {
      if (Object.keys(this.pokemon).length > 0) {
        return this.pokemon.name;
      } else {
        return "";
      }
    },
    types() {
      if (Object.keys(this.pokemon).length > 0) {
        return this.pokemon.types;
      } else {
        return ["loading"];
      }
    },
    image() {
      if (Object.keys(this.pokemon).length > 0) {
        return this.pokemon.art;
      } else {
        return require("@/assets/img/pokeball.png");
      }
    },
  },
  methods: {
    number(id) {
      return this.formatNumberId(id.toString());
    },
    setOnLoad(img) {
      let that = this;
      img.onload = function () {
        that.currentSrc = that.pokemon.image;
      };
      img.src = that.pokemon.image;
    },
    fetchPokemon(id) {
      let pokemonImg;
      pokemonImg = new Image();
      let name = this.$pokedexCache.get(parseInt(id));
      if (name) {
        this.pokemon = this.$pokedexCache.get(name);
        this.loaded = true;
        console.log(`loaded ${name} from cache`);
        this.setOnLoad(pokemonImg);
        this.fetchEntry();
      } else {
        console.log(`fetching #${id}`);
        axios
          .get("https://pokeapi.co/api/v2/pokemon/" + id)
          .then(({ data }) => {
            this.pokemon = this.parsePokemon(data);
            this.loaded = true;
            this.setOnLoad(pokemonImg);
            this.$pokedexCache.set(this.pokemon.name, this.pokemon);
            this.$pokedexCache.set(this.pokemon.id, this.pokemon.name);
            this.fetchEntry();
          })
          .catch((err) => {
            if (err.response.status === 404) {
              this.notFound = true;
            } else {
              console.log(err);
            }
          });
      }
    },        
    fetchEntry() {
      axios
        .get(this.pokemon.species_url)
        .then(({ data }) => {
          let entries = data.flavor_text_entries
            .filter(
              (e) =>
                e.language.name === "en" && !e.flavor_text.includes("\u000c")
            )
            .map((e) => e.flavor_text);
          this.pokedexEntry = entries[0];
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.fetchPokemon(this.id);
  },
  beforeRouteUpdate(to) {
    this.loaded = false;
    this.currentSrc = null;
    this.pokedexEntry = "";
    this.fetchPokemon(to.params.id);
  },
};
