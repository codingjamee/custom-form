export default class Component {
  $target;
  state;
  router;

  constructor($target, router) {
    this.$target = $target;
    this.router = router;
    
    this.setup();
    this.render();
  }

  setup() {
  }
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  mounted() {
  }
  setEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
