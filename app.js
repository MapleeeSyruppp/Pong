// canvas class
class Board{
    constructor(element){
        this.canvas = element
    }

    createContext(){
        console.log(`context set`)
        this.context = this.canvas.getContext('2d')
    }
    createSize(height, width){
        console.log('size set')
        this.canvas.height = height
        this.canvas.width = width
    }

    fillStyle(colour){
        this.context.fillStyle = colour
    }
    fillRect(x, y, width, height){
        console.log('rect set')
        this.context.fillRect(x, y, width, height)
    }
}

const el = document.getElementById("board")
const gameBoard = new Board(el)
gameBoard.createSize(500,500)
gameBoard.createContext()

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
        else if(this.pos.y + 60 >= gameBoard.height){
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
        const direction = {
            x: Math.random() - 0.5 >= 0 ? -0.8 : 0.8,
            y: Math.random() - 0.5 >= 0 ? -1 : 1,
        }
        this.velocity = {
            x: direction.x,
            y: direction.y
        }
        this.width = 10
        this.height = 10
    }

    draw(){
        gameBoard.fillStyle = 'white'
        gameBoard.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }

    checkBoundaryCollision(){
        const rightSide = this.pos.x + this.width + this.velocity.x
        const leftSide = this.pos.x + this.velocity.x
        const topSide = this.pos.y + this.height + this.velocity.y
        const bottomSide = this.pos.y + this.velocity.y
        // Boundary collision
        // Top / Bot
        if(topSide >= gameBoard.height || bottomSide <= 0){
            this.velocity.y = -this.velocity.y
        }
        // Right / Left
        if(rightSide >= gameBoard.width || leftSide <= 0){
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
        // Boundary collision
        this.checkBoundaryCollision()
        // Paddle collision
        this.checkPaddleCollision()
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }
}

const paddle1 = new Paddle({x: 30, y: gameBoard.height / 2 - 30})
const paddle2 = new Paddle({x: gameBoard.width - 30, y: gameBoard.height / 2 - 30})
const ball = new Ball({x: gameBoard.width / 2 - 5, y: gameBoard.height / 2 - 5})

// Draw
function animate(){
    requestAnimationFrame(() => (animate()))
    gameBoard.fillStyle('black')
    gameBoard.fillRect(0, 0, gameBoard.width, gameBoard.height)
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