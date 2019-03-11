

// js禁用屏幕滚动
// document.body.ontouchstart= function(eee){
//   eee.preventDefault();
// }





var xxx = document.getElementById('xxx')

var context = xxx.getContext('2d')

//获取当前的页面宽高，设置为画布的宽高

var lineWidth = 5



autoSetCanvasSize(xxx)




lisenToUser(xxx)











var eraserEnabled = false//橡皮擦初始没有激活
eraser.onclick = function () {
  eraserEnabled = true //切换状态 
  eraser.classList.add('active')
  pen.classList.remove('active')

}

//点击画笔  切换 css状态  
//css z状态必须是actions  和 actions.x 两种
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')

}
black.onclick = function () {
  black.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  red.classList.remove('active')

  context.fillStyle = 'red'
  context.strokeStyle = 'red'
}


red.onclick = function () {
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
}
green.onclick = function () {
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')

  context.fillStyle = 'green'
  context.strokeStyle = 'green'
}
blue.onclick = function () {
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')

  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
}



thin.onclick = function () {
  lineWidth = 2;//不需要兼顾 画的问题，只设置粗细多少就行，将变量赋给划线的lineWidth
}

thick.onclick = function () {
  lineWidth = 5;
}


clear.onclick = function () {
  context.clearRect(0, 0, xxx.width, xxx.height)
}


download.onclick = function () {
  var url = xxx.toDataURL('image/png')
  console.log(url)
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'//下载图的名字
  a.target = '_blank'
  a.click() //调用 click()
}









function autoSetCanvasSize(canvas) {

  setCanvasSize()

  // 窗口的大小变动 后 触发
  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight

  }

}







function lisenToUser(canvas) {

  //按下  画圆点
  var lastPoint = {
    x: undefined,
    y: undefined
  }//下面函数内获取lastPoint坐标，好调用


  var using = false  //一个变量判断不同的状态,是否在用






  if (document.body.ontouchstart !== undefined) {
    //触屏设备  

    canvas.ontouchstart = function (aaa) {
      console.log(aaa)
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true
      if (eraserEnabled) {//激活橡皮


        context.clearRect(x, y, 10, 10)
      } else {


        lastPoint = {
          x: x,
          y: y
        }
      }

    }


    canvas.ontouchmove = function (aaa) {
      console.log('move')

      if (!using) {//排除using 不用的状态 
        return
      }
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;

      if (eraserEnabled) {

        context.clearRect(x - 5, y - 5, 10, 10)// -5 是让橡皮擦哦居中



      } else {


        var newPoint = {
          x: x,
          y: y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }

    canvas.ontouchend = function (aaa) {
      console.log('end')

    }




  }
  else {
    //非触屏设备

    // 首先是否激活 当前状态时画笔还是橡皮
    // 激活状态下  是否按下使用

    canvas.onmousedown = function (aaa) {

      var x = aaa.clientX;
      var y = aaa.clientY;

      using = true
      if (eraserEnabled) {//激活橡皮


        context.clearRect(x, y, 10, 10)
      } else {


        lastPoint = {
          x: x,
          y: y
        }
      }

    }



    //移动  画线
    canvas.onmousemove = function (aaa) {
      console.log('move')

      if (!using) {//排除using 不用的状态 
        return
      }
      var x = aaa.clientX;
      var y = aaa.clientY;

      if (eraserEnabled) {

        context.clearRect(x - 5, y - 5, 10, 10)// -5 是让橡皮擦哦居中



      } else {


        var newPoint = {
          x: x,
          y: y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }




    }



    //松开鼠标   结束画线
    canvas.onmouseup = function (aaa) {
      console.log('up')
      using = false

    }

  }

}





function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()//填充内容
}



function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.fillStyle = "black"
  context.strockStyle = 'black'
  context.moveTo(x1+0.5, y1)
  context.lineWidth = lineWidth  //这样粗细写死了，变成变量使用

  context.lineTo(x2+0.5, y2)
  context.stroke()//绘制线条
  context.closePath()

}










