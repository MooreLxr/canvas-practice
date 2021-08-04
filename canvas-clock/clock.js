let ctx
$(function() {
  let canvas = $('#canvasDOM')[0]
  ctx = canvas.getContext('2d')
  canvas.width = 600
  canvas.height = 600


  setInterval(() => {
    draw()
  }, 1000)
  draw()
})

function draw () {
  ctx.save()

  ctx.clearRect(0, 0, 600, 600)
  ctx.translate(300,300)
  ctx.save() // -------------保存初始状态

  // 绘制表心，表框
  ctx.beginPath()
  ctx.arc(0, 0, 5, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
  ctx.beginPath()
  ctx.arc(0, 0, 200, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()

  let now = new Date(),
    hour = now.getHours() % 12,
    min = now.getMinutes(),
    sec = now.getSeconds()
  
  // 绘制时针
  ctx.lineWidth = 10
  ctx.rotate(2 * Math.PI / 12 * hour + 2 * Math.PI / 12 *(min/60) - 1/2 * Math.PI) // 原理如图①
  ctx.moveTo(0, 0)
  ctx.lineTo(100, 0)
  ctx.stroke()
  ctx.restore() // -----------恢复上一次保存的状态 
  ctx.save() // --------------保存当前状态

  // 绘制分针
  ctx.lineWidth = 5
  ctx.rotate(2 * Math.PI / 60 * min + 2 * Math.PI / 60 *(sec/60) - 1/2 * Math.PI) // 原理和时针一样，比例不同（时针一圈是12个刻度，分针是60个刻度）
  ctx.moveTo(0, 0)
  ctx.lineTo(130, 0)
  ctx.stroke()
  ctx.restore() // ------------恢复上一次保存的状态
  ctx.save() // ---------------保存当前状态

  // 绘制秒针
  ctx.lineWidth = 1
  ctx.rotate(2 * Math.PI / 60 * sec - 1/2 * Math.PI) // 原理和时针一样，比例不同（时针一圈是12个刻度，分针是60个刻度）
  ctx.moveTo(0, 0)
  ctx.lineTo(160, 0)
  ctx.stroke()
  ctx.restore() // ---------------恢复上一次保存的状态
  ctx.save() // ------------------保存当前状态

  // 绘制刻度
  ctx.lineWidth = 5
  for (let i=0;i< 12; i++) {
    ctx.rotate(2 * Math.PI / 12)
    ctx.moveTo(180, 0)
    ctx.lineTo(200, 0)
    ctx.stroke()
    // 文字
    ctx.font = '16px 微软雅黑 bold'
    ctx.fillText(i<=8 ? i+4 : i-8, 160, 0)
  }
  ctx.restore()
  ctx.save()

  ctx.lineWidth = 1
  for (let i=0; i< 60; i++) {
    ctx.rotate(2 * Math.PI / 60)
    ctx.moveTo(190, 0)
    ctx.lineTo(200, 0)
    ctx.stroke()
  }
  ctx.restore()

  ctx.restore()
}