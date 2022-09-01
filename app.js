const el = document.getElementById("board")
const gameBoard = new Board(el)
gameBoard.createContext()
gameBoard.createSize(500,500)

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