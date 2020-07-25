//蛇对象
//Snake

(function () {
  let position = 'absolute';
  //记录之前创建的蛇
  let elements = [];
  
  function Snake(options) {
    options = options || {};
    //蛇节大小
    this.width = options.width || 20;
    this.height = options.height || 20;
    //蛇移动的方向
    this.direction = options.direction || 'right';
    //蛇的身体（蛇节+蛇头）  默认一开始蛇头+蛇身体（2蛇节） = 3个蛇节
    //第一个元素 是蛇头
    this.body = [
      {x:3, y: 2, color: 'red'},
      {x:2, y: 2, color: 'yellow'},
      {x:1, y: 2, color: 'yellow'},
    ]; 
  }
  
  //render方法 将蛇渲染到地图上
  Snake.prototype.render = function(map) {
    //删除之前创建的蛇
    remove();
    //把每一个蛇节渲染到地图上
    for (let i = 0, len = this.body.length; i < len; i++) {
      //蛇节
      let object = this.body[i];
      //
      let div = document.createElement('div');
      map.appendChild(div);
  
      elements.push(div);   //记录一系列已经生成的蛇
  
      div.style.position = position;
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';
      div.style.left = object.x * this.width + 'px';
      div.style.top = object.y * this.height + 'px';
      div.style.backgroundColor = object.color;
    }
  }

  function remove() {
    for (let i = elements.length - 1; i >= 0; i--) {
      //删除div
      elements[i].parentNode.removeChild(elements[i]);
      //删除数组中的元素
      elements.splice(i, 1);
    }
  }

  Snake.prototype.move = function(food, map) {
    // 控制蛇的身体移动 
    //当前蛇节到上一个蛇节的位置 (只管身体)
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }


    //控制蛇的头移动
    //把头取出来
    let head = this.body[0];
    switch(this.direction) {
      case 'right': 
        head.x += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'top':
        head.y -= 1;
        break;
      case 'bottom':
        head.y += 1;
        break;    
    }

    //2.4 判断蛇头是否和食物的坐标重合
    let headX = head.x * this.width;
    let headY = head.y * this.height;

    if(headX === food.x && headY === food.y) {
        //让蛇增加一节
        //获取蛇的最后一节
        let last = this.body[this.body.length - 1];
        this.body.push({
          x: last.x,
          y: last.y,
          color: last.color
        })


        //随机在地图上重新生成食物
        food.render(map);

  } 
}



  window.Snake = Snake;
})()


