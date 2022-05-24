import pokemonMixin from "@/mixins/pokemonMixin.js";

export default {
  name: "PokemonCard",
  props: {
    id: Number,
    name: String,
    image: String,
    types: Array,
  },
  mixins: [pokemonMixin],
  data() {
    return {
      currentSrc: null,
    };
  },
  mounted: function () {
    let pokemonImg, that;
    pokemonImg = new Image();
    that = this;
    pokemonImg.onload = function () {
      that.currentSrc = that.image;
    };
    pokemonImg.src = that.image;
  },
  computed: {
    number() {
      return this.formatNumberId(this.id.toString());
    },
  },
};