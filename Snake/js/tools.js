(function() {
  let Tools = {
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  window.Tools = Tools;
})()
