window.onload = function () {
  const canvas = document.getElementById('canvasDOM')
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'darkgray'
  ctx.fillRect(0, 0, 400, 100)
  ctx.fillStyle = '#fff'
  ctx.font = "22px '微软雅黑'"
  ctx.textAlign = 'center'
  // 绘制填充文字
  ctx.fillText('刮刮卡', 190, 50)

  let isDraw = false
  canvas.onmousedown = function () {
    isDraw = true
  }
  canvas.onmousemove = function (e) {
    if (!isDraw) return
    const x = e.pageX - canvas.offsetLeft
    const y = e.pageY - canvas.offsetTop
    ctx.globalCompositeOperation = 'destination-out'
    ctx.arc(x, y, 10, 0, 2 * Math.PI)
    ctx.fill()
  }
  canvas.onmouseup = function () {
    isDraw = false
  }
}