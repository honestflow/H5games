//常量
//每次移动的距离，步长
const STEP = 20;
//分割容器 18行 10列
const ROW_COUNT = 18,
      COL_COUNT = 10;
//构建每个模型的数据源
const MODELS = [
  //第一个模型数据源(L形状)
  {
    0: {
      row: 2,
      col: 0
    },
    1: {
      row: 2,
      col: 1
    },
    2: {
      row: 2,
      col: 2
    },
    3: {
      row: 1,
      col: 2
    }
  }
];

//变量
//当前使用的模型
let currentModel = {}

//标记16宫格的位置
let currentX = 0,
    currentY = 0;

//入口方法
function init() {
  createModel();
  onKeyDown();
}

//根据模型的数据源来创建对应的块元素
function createModel() {
  //确定当前使用哪个模型
  currentModel = MODELS[0];
  //生成对应数量的块元素
  for (let key in currentModel) {
    let divEle = document.createElement('div');
    divEle.className = "activity_model";
    document.getElementById('container').appendChild(divEle);
  }
  //定位块元素的位置
  locationBlocks();
}

//根据数据源定位块元素的位置
function locationBlocks() {
  //判断块元素的越界行为
  checkBound();

  //1.拿到所有块元素
  let eles = document.getElementsByClassName('activity_model');
  for (let i = 0; i < eles.length; i++) {
    var activityModelEle = eles[i];
    //2.找到每个块元素对应的数据（行、列）
    let blockModel = currentModel[i];
    //3.根据每个块元素对应的数据来指定块元素的位置
    //每个块元素的位置由两个值确定： 1、16宫格所在的位置 2、块元素在16宫格中的位置
    activityModelEle.style.top = (currentY + blockModel.row) * STEP + 'px';
    activityModelEle.style.left = (currentX + blockModel.col) * STEP + 'px';
  }
}

//监听用户的键盘事件
function onKeyDown() {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 38:
        console.log('上');
        rotate();
        break;
      case 39:
        console.log('右');
        move(1, 0)
        break;
      case 40:
        console.log('下');
        move(0, 1)
        break;
      case 37:
        console.log('左');
        move(-1, 0)
        break;
    }
  }
}

//移动
function move(x, y) {
  //控制块元素进行移动
  // let activityModelEle = document.getElementsByClassName("activity_model")[0];
  // activityModelEle.style.top = parseInt(activityModelEle.style.top || 0) + y * STEP + 'px';
  // activityModelEle.style.left = parseInt(activityModelEle.style.left || 0) + x * STEP + 'px';
  currentX += x;
  currentY += y;

  //根据16宫格的位置来重新定位块元素
  locationBlocks();
}

//旋转模型
function rotate() {
  //算法
  //旋转后的行 = 旋转前的行
  //旋转后的列 = 3 - 旋转前的行

  //遍历我们的 模型数据源
  for (let key in currentModel) {
    //块元素的数据源
    let blockModel = currentModel[key];
    //实现我们的算法
    let temp = blockModel.row;
    blockModel.row = blockModel.col;
    blockModel.col = 3 - temp;
  }
  locationBlocks();
}

//控制 模型只能在容器中移动
function checkBound() {
  // 定义模型可以活动的边界
  let leftBound = 0,
      rightBound = COL_COUNT,
      bottomBound = ROW_COUNT;
  //当模型中有个块元素超过边界之后，让16宫格 后退一步  
  for (let key in currentModel) {
    //块元素的数据
    let blockModel = currentModel[key];
    //左侧越界
    if (blockModel.col + currentX < leftBound) {
      currentX ++ ;
    }
    //右侧越界
    if (blockModel.col + currentX >= rightBound) {
      currentX -- ;
    }
    //底部越界
    if (blockModel.row + currentY >= bottomBound) {
      currentY -- ;   
    }
  }
}



