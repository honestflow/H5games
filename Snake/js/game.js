(function() {
  let that;
  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }

  Game.prototype.start = function() {
    //1.把食物和蛇渲染到地图上
    this.food.render(this.map);
    this.snake.render(this.map);

    //2.开始游戏的逻辑
    //2.1 蛇动起来
    //2.2 蛇碰到边界会死（游戏结束）
    runSnake();

    //2.3 通过键盘控制蛇移动
    bindKey();
    //2.4 蛇吃食物 食物消失 蛇变长  食物重新随机出现

  }

  //私有函数 让蛇动起来
  function runSnake() {
    let timerId = setInterval(function() {
      //让蛇走一格
      //在定时器的function中 this是指向window对象的this.snake
      //要获取游戏对象中的蛇属性
      that.snake.move(that.food, that.map);
      that.snake.render(that.map);

      //当蛇遇到边界游戏结束
      //获取蛇头的坐标
      const maxX = that.map.offsetWidth / that.snake.width;
      const maxY = that.map.offsetHeight / that.snake.height;
      let headX = that.snake.body[0].x;
      let headY = that.snake.body[0].y;

      if (headX < 0 || headX >= maxX) {
        alert('游戏结束');
        clearInterval(timerId);
      } 

      if (headY < 0 || headY >= maxY) {
        alert('游戏结束');
        clearInterval(timerId);
      } 
    },150);
  }

  function bindKey() {
    document.addEventListener('keydown', function(e) {
      //37 - left
      //38 - top
      //39
      //40
      switch (e.keyCode) {
        case 37: 
          that.snake.direction = 'left';
          break;
        case 38: 
          that.snake.direction = 'top';
          break;
        case 39: 
          that.snake.direction = 'right';
          break;
        case 40: 
          that.snake.direction = 'bottom';
          break;         
      }
    }, false)

  }

  window.Game = Game;
})()

