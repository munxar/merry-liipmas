const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

function update(tick) {
    requestAnimationFrame(update)
    resize(ctx)
    draw(ctx, tick)    
}

requestAnimationFrame(update)

function resize(ctx) {
    if(window.innerWidth !== ctx.canvas.width) {
        canvas.width = window.innerWidth
    }
    if(window.innerHeight !== ctx.canvas.height) {
        canvas.height = window.innerHeight
    }    
}

function draw(ctx, tick) {    
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height)
}
