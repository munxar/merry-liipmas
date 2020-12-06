/**
 * merry christmas to you, dear Liiper!
 */
const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')
const rand = (from, to) => Math.floor(from + (to - from) * Math.random())

let snow = []
const makeFlake = () => ({
    active: true,
    x: rand(0, canvas.width), 
    y: rand(0, canvas.height), 
    s: rand(1,5),
    o: Math.random() * Math.PI * 2
})
function init() {
    snow = new Array(64).fill(0).map(() => {
        return makeFlake()
    })    
}
init()

function update(tick) {
    requestAnimationFrame(update)
    resize(ctx)
    animate(tick)
    draw(ctx, tick)        
}

requestAnimationFrame(update)

function resize(ctx) {
    if(window.innerWidth !== ctx.canvas.width || window.innerHeight !== ctx.canvas.height) {
        canvas.width = window.innerWidth        
        canvas.height = window.innerHeight
        init()
    }        
}

function draw(ctx, tick) {    
    ctx.fillStyle = `rgb(0,0,0)`
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height)        
    ctx.fillStyle = `rgb(255,255,255)`

    snow.forEach(flake => {
        ctx.fillRect(flake.x, flake.y, flake.s, flake.s)
    })

    ctx.font = '30px Arial'
    ctx.fillStyle = '#6ea644'
    ctx.fillText('Merry Liipmas', canvas.width / 2 - 90, canvas.height / 2)
}

function animate(tick) {
    snow.forEach(flake => {
        if(flake.active) {
            if(flake.y < canvas.height - flake.s) {
                flake.y += flake.s
                flake.x += 0.5 / flake.s * Math.sin(tick / 100 + flake.o)
            } else {
                flake.active = false
                snow.push(makeFlake())
            }
        }                         
    })
}