/**
 * merry christmas to you, dear Liiper!
 */
const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')
const rand = (from, to) => Math.floor(from + (to - from) * Math.random())
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title') || '';
const text = urlParams.get('text') || ''
const fontSize = 30
const colors = {
    black: '#414141',
    white: '#F7F7F5',
    green: '#6EA644',
    greenLight: '#A4C339'
}

let snow = []
const makeFlake = () => ({
    active: true,
    x: rand(0, canvas.width), 
    y: rand(0, canvas.height), 
    s: rand(1,6),
    o: Math.random() * Math.PI * 2
})
function init() {
    snow = new Array(128).fill(0).map(() => {
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
    ctx.fillStyle = colors.black
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height)        
    
    ctx.fillStyle = colors.white

    snow.forEach(flake => {
        ctx.fillRect(flake.x, flake.y, flake.s, flake.s)
    })

    ctx.font = `${fontSize}px Arial`
    ctx.fillStyle = colors.green
    ctx.textAlign = 'center'
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 - fontSize / 1.5)
    ctx.fillStyle = colors.greenLight
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + fontSize / 1.5)    
}

function animate(tick) {
    snow.forEach(flake => {        
            if(flake.y < canvas.height - flake.s) {
                flake.y += flake.s
                flake.x += 0.5 / flake.s * Math.sin(tick / 1000 + flake.o) * 2
            } else {
                flake.y = 0;                
            }            
    })
}