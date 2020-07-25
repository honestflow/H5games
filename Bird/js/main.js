//让小鸟飞起来
//移动的背景
//top
//定时器
//动画原理 leader = leader + step
//获取相应的元素

let game = document.getElementById('game');
let birdEle = document.getElementById('bird');
let landEle = document.getElementById('land');
//初始化背景图的值

let sky = {
  x: 0
}

//初始化小鸟bird的初始值
let bird = {
  speedX: 5,    //x轴速度
  speedY: 1,    //y轴速度
  x: birdEle.offsetLeft,
  y: birdEle.offsetTop
}

//游戏的状态
let running = true;
setInterval(function() {
  if(running) {
    //移动背景  让小鸟实现水平运动
    sky.x -= 3;
    game.style.backgroundPositionX = sky.x + 'px';
        //实现小鸟上下运动
    bird.speedY += 1.4;    //加速度
    bird.y += bird.speedY;

    if(bird.y < 0){
      running = false;
      bird.y = 0;
    }
    if(bird.y + birdEle.offsetHeight > 521) {
      running = false;
      bird.y = 521 - birdEle.offsetHeight;
    }

    birdEle.style.top = bird.y + 'px';    
  }
}, 30)

//按下空格的时候实现小鸟向上运动
document.addEventListener('keydown', function(e) {
  if(e.key == " ") {
    bird.speedY = -14;
  }
}, false)

//创建管道
function createPipe(position) {
  let pipe = {};
  pipe.x = position;
  //规定上管道的高度 ： 10 - 300 之间
  pipe.uHeight =  Math.floor(Math.random() * (300 - 10 + 1)) + 10;
  pipe.dHeight = 600 - pipe.uHeight - 230;
  pipe.dTop = pipe.uHeight + 150;

  //上管道
  let uPipe = document.createElement('div');
  uPipe.style.width = '52px';
  uPipe.style.height = pipe.uHeight + 'px';
  uPipe.style.background = 'url(./img/pipe2.png) no-repeat center bottom';
  uPipe.style.position = 'absolute';
  uPipe.style.top = 0;
  uPipe.style.left = pipe.x + 'px';
  game.appendChild(uPipe);

  //下管道
  let dPipe = document.createElement('div');
  dPipe.style.width = '52px';
  dPipe.style.height = pipe.dHeight + 'px';
  dPipe.style.background = 'url(./img/pipe1.png) no-repeat center top';
  dPipe.style.position = 'absolute';
  dPipe.style.top = pipe.dTop + 'px';
  dPipe.style.left = pipe.x + 'px';
  game.appendChild(dPipe);

  //移动管道
  setInterval(function() {
    if(running) {
      pipe.x -= 2;
      uPipe.style.left = pipe.x + 'px';
      dPipe.style.left = pipe.x + 'px';
      if(pipe.x < -52) {
          pipe.x = 760;
      }
      let uCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 && 
      bird.y < pipe.uHeight;
      let dCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 && 
      bird.y > pipe.uHeight + 120 ;
      if(uCheck || dCheck) {
        running = false;
      }
    }
  }, 15)
}

createPipe(600);
createPipe(800);
createPipe(1000);
createPipe(1200);








