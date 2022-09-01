// canvas class
class Board{
    constructor(element){
        this.canvas = element
        this.score = {
            p1: 0,
            p2: 0
        }
    }
    createContext(){
        this.context = this.canvas.getContext('2d')
    }
    createSize(height, width){
        this.canvas.height = height
        this.canvas.width = width
    }
    fillStyle(colour){
        this.context.fillStyle = colour
    }
    fillRect(x, y, width, height){
        this.context.fillRect(x, y, width, height)
    }
    renderBackground(){
        const pos = {
            one: (this.canvas.width / 4) - 17,
            two: (this.canvas.width / 4 * 3)
        }
        const marginTop = 100
        this.fillStyle("rgba(255, 255, 255, 0.25)")
        this.context.font = "bold 45px Arial";
        this.context.opacity = 0.5;
        this.context.fillText(`${this.score.p1}`, pos.one, marginTop);
        this.context.fillText(`${this.score.p2}`, pos.two, marginTop);

        const height = 30
        var y = -25
        for(var i = 0; i < 10; i++){
            this.fillStyle("rgba(255, 255, 255, 0.25)")
            y += 47
            this.fillRect(this.canvas.width / 2 - 3, y, 6, height)
        }
    }
    keepCenter(){
        let currentDate = Date.now()
        const center = setInterval(() => {
            const speed = 0.8
            // Reset paddle position
            paddle1.pos.x = 30
            paddle1.pos.y = gameBoard.canvas.height / 2 - 30
            paddle2.pos.x = gameBoard.canvas.width - 40
            paddle2.pos.wy = gameBoard.canvas.height / 2 - 30
            // Reset ball position
            ball.pos.x = gameBoard.canvas.width / 2 - 5
            ball.pos.y = gameBoard.canvas.height / 2 - 5
            // Reset velocities
            ball.velocity.x = Math.random() - 0.5 >= 0 ? -speed : speed
            ball.velocity.y = Math.random() - 0.5 >= 0 ? -speed : speed
            if(Date.now() >= currentDate + 1500){
                clearInterval(center)
            }
        }, 1)
    }
    reset(score){
        if(score.p1 < gameBoard.score.p1 || score.p2 < gameBoard.score.p2){
            this.keepCenter()
        }
        
    }
    setScore(){
        let currentScore = {
            p1: gameBoard.score.p1,
            p2: gameBoard.score.p2
        }
        if(ball.pos.x >= 489.5){
            gameBoard.score.p1 += 1
        }
        if(ball.pos.x <= 0.5){
            gameBoard.score.p2 += 1
        }
        const currentDate = new Date()
        //  setInterval(() => {this.reset(currentScore)}, 1)
        this.reset(currentScore)
    }
}

const el = document.getElementById("board")
const gameBoard = new Board(el)
gameBoard.createContext()
gameBoard.createSize(500,500)

class Paddle{
    constructor(pos){
        this.pos = pos
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 10
        this.height = 60
    }
    draw(){
        gameBoard.fillStyle('white')
        gameBoard.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    checkOutOfBounds(){
        if(this.pos.y <= 0){
            this.velocity.y = 0
        }
        else if(this.pos.y + 60 >= gameBoard.canvas.height){
            this.velocity.y = 0
        }
    }
    update(){
        this.draw()
        this.pos.y += this.velocity.y
        this.checkOutOfBounds()
    }
}
class Ball{
    constructor(pos){
        this.pos = pos
        //Math.random() - 0.5 >= 0 ? -(velocity) : (velocity)
        const speed = 0.8
        const direction = {
            x: Math.random() - 0.5 >= 0 ? -speed : speed,
            y: Math.random() - 0.5 >= 0 ? -speed : speed,
        }
        this.velocity = {
            x: direction.x,
            y: direction.y
        }
        this.width = 10
        this.height = 10
    }
    draw(){
        gameBoard.fillStyle('white')
        gameBoard.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    checkBoundaryCollision(){
        const rightSide = this.pos.x + this.width + this.velocity.x
        const leftSide = this.pos.x + this.velocity.x
        const topSide = this.pos.y + this.height + this.velocity.y
        const bottomSide = this.pos.y + this.velocity.y
        // Boundary collision
        // Top / Bot
        if(topSide >= gameBoard.canvas.height || bottomSide <= 0){
            this.velocity.y = -this.velocity.y
        }
        // Right / Left
        if(rightSide >= gameBoard.canvas.width || leftSide <= 0){
            this.velocity.x = -this.velocity.x
        }
    }
    checkPaddleCollision(){
        const p1 = {
            leftSide: paddle1.pos.x,
            rightSide: paddle1.pos.x + paddle1.width,
            topSide: paddle1.pos.y,
            bottomSide: paddle1.pos.y + paddle1.height
        }
        const p2 = {
            leftSide: paddle2.pos.x,
            rightSide: paddle2.pos.x + paddle2.width,
            topSide: paddle2.pos.y,
            bottomSide: paddle2.pos.y + paddle2.height
        }
        // Checks
        // Paddle 1 Check
        if(this.pos.x + this.velocity.x <= p1.rightSide && this.pos.y + this.velocity.y >= p1.topSide && this.pos.y + this.velocity.y <= p1.bottomSide){
            this.velocity.x = -this.velocity.x
        }
        // Paddle 2 Check
        if(this.pos.x + this.width + this.velocity.x >= p2.leftSide && this.pos.y + this.velocity.y >= p2.topSide && this.pos.y + this. velocity.y <= p2.bottomSide){
            this.velocity.x = -this.velocity.x
        }
    }
    update(){
        this.draw()
        this.checkBoundaryCollision()
        this.checkPaddleCollision()
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }
}

const paddle1 = new Paddle({x: 30, y: gameBoard.canvas.height / 2 - 30})
const paddle2 = new Paddle({x: gameBoard.canvas.width - 40, y: gameBoard.canvas.height / 2 - 30})
const ball = new Ball({x: gameBoard.canvas.width / 2 - 5, y: gameBoard.canvas.height / 2 - 5})

// Draw
gameBoard.keepCenter()
function animate(){
    requestAnimationFrame(() => (animate()))
    gameBoard.fillStyle('black')
    gameBoard.fillRect(0, 0, gameBoard.canvas.width, gameBoard.canvas.height)
    gameBoard.renderBackground()
    gameBoard.setScore()
    paddle1.update()
    paddle2.update()
    ball.update()
}
animate()

addEventListener('keydown',(ev)=>{
    switch(ev.key){
        case 'w':
            // Go up
            paddle1.velocity.y = -1.5
            paddle1.update()
            break;
        case 's':
            // Go down
            paddle1.velocity.y = 1.5
            paddle1.update()
            break;
        case 'ArrowUp':
            // Go up
            paddle2.velocity.y = -1.5
            paddle2.update()
            break;
        case 'ArrowDown':
            // Go up
            paddle2.velocity.y = 1.5
            paddle2.update()
            break;
    }
})

addEventListener('keyup',(ev)=>{
    switch(ev.key){
        case 'w':
            // Go up
            paddle1.velocity.y = 0
            paddle1.update()
            break;
        case 's':
            // Go down
            paddle1.velocity.y = 0
            paddle1.update()
            break;
        case 'ArrowUp':
            // Go up
            paddle2.velocity.y = 0
            paddle2.update()
            break;
        case 'ArrowDown':
            // Go up
            paddle2.velocity.y = 0
            paddle2.update()
            break;
    }
})