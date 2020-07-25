//食物对象
//Food

(function () {
  let position = 'absolute';
//记录上一次创建的食物，为删除做准备  （因为每次被蛇吃，食物都会被删除）
  let elements = [];

function Food(options) { 
  options = options || {};    //默认值
  //食物位置
  this.x = options.x || 0;  
  this.y = options.y || 0;

  //食物大小
  this.width = options.width || 20;
  this.height = options.height || 20;

  //食物颜色
  this.color = options.color || 'green';
}

//render方法 将食物渲染到地图上
Food.prototype.render =  function(map) {
  //删除之前的食物
  remove();

  //随机在地图上生成食物 （x,y）
  this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
  this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

  let div = document.createElement('div');
  map.appendChild(div);

  elements.push(div);   //记录一系列已经生成的食物数组

  //设置食物div样式
  div.style.position = position;
  div.style.left = this.x + 'px';
  div.style.top = this.y + 'px';
  div.style.width = this.width + 'px';
  div.style.height = this.height + 'px';
  div.style.backgroundColor = this.color;
}


function remove() {
  for (let i = elements.length - 1; i >= 0; i--) {
    //删除div
    elements[i].parentNode.removeChild(elements[i]);
    //删除数组中元素
    elements.splice(i, 1);
  }
}

  window.Food = Food;
})()


