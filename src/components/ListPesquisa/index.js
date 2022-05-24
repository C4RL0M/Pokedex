import pokemonMixin from "@/mixins/pokemonMixin.js";

export default {
  name: "SearchBar",
  props: ["results"],
  mixins: [pokemonMixin],
  data() {
    return {
      inputString: '',
      arrowIndex: -1,
    }
  },
  computed: {
    filteredResults() {
      return this.results.filter(r => {
        let name = r.name.toLowerCase() + this.formatNumberId(r.id);
        let input = this.inputString.toLowerCase();
        this.arrowIndex = -1;
        return name.includes(input);
      });
    }
  },
  methods: {
    onArrowUp() {
      if (this.arrowIndex >= 0) {
        this.arrowIndex -= 1;
        let target = document.getElementsByClassName('active-item')[0];
        if (target) {
          let parent = target.parentNode;
          if (target.offsetTop - parent.scrollTop <= 0)
            parent.scrollTop -= target.offsetHeight;
        }
      } else {
        this.arrowIndex = this.filteredResults.length - 1;
        let el = document.getElementById('drop-list');
        el.scrollTop = el.scrollHeight;
      }
    },
    onArrowDown() {
      if (this.arrowIndex < this.filteredResults.length - 1) {
        this.arrowIndex += 1;
        let target = document.getElementsByClassName('active-item')[0];
        if (target) {
          let parent = target.parentNode;
          if (target.offsetTop - parent.scrollTop >= parent.offsetHeight - target.offsetHeight)
            parent.scrollTop += target.offsetHeight;
        }
      } else {
        this.arrowIndex = -1;
        document.getElementById('drop-list').scrollTop = 0;
      }
    },
    onEnter() {
      if (this.arrowIndex >= 0 && this.arrowIndex < this.filteredResults.length) {
        this.navigate(this.filteredResults[this.arrowIndex].id);
      }
    },
    onMouseOver(i) {
      this.arrowIndex = i;
    }
  }
};