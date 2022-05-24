export default {
  name: "Navbar",
  data() {
    return {
      prevPos: window.pageYOffset,
    }
  },
  methods: {
    top() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    scroll() {
      window.onscroll = () => {
        let currentPos = window.pageYOffset;
        if (this.prevPos > currentPos) {
          document.getElementById("pokenav").style.top = "0";
        } else {
          document.getElementById("pokenav").style.top = "0px";
        }
        this.prevPos = currentPos;
      }
    }
  },
  created() {
    this.prevPos = window.pageYOffset;
    this.scroll();
  }
};