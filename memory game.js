let tiles = []
let openedTiles = []
let matchedTiles = []
let score = 0
let timer = 150
let timerInterval

function initGame() {
    document.getElementById("update_res").textContent = "Click a Tile to start the game"
    document.getElementById("time_left").innerHTML = "Time Left: <b>150s</b>"
    document.getElementById("score_1").textContent = "Your Score: 0"
    const values = []
    for (let i = 0; i < 18; i++) {
        values.push(i, i)
    }
    shuffle(values)
    const boxContainers = document.getElementById("box_containers")
    boxContainers.innerHTML = ''
    tiles = []

    for (let i = 0; i < 36; i++) {
        let tile = document.createElement("div")
        tile.classList.add("box")
        tile.dataset.value = values[i]
        tile.addEventListener("click", onTileClick)
        boxContainers.appendChild(tile)
        tiles.push(tile)
    }
    matchedTiles = []
    openedTiles = []
    score = 0
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

function onTileClick(event) {
    if (timer === 150) startTimer()
    const tile = event.target
     if (!openedTiles.includes(tile) && !matchedTiles.includes(tile)) {
        tile.textContent = tile.dataset.value
        openedTiles.push(tile)
        if (openedTiles.length === 2) {
            checkMatch()
        }
    }
}
function checkMatch() {
    const [tile1, tile2] = openedTiles
    if (tile1.dataset.value === tile2.dataset.value) {
        matchedTiles.push(tile1, tile2)
        score += 10
        document.getElementById("score_1").textContent = `Your Score: ${score}`
        if (matchedTiles.length === tiles.length) {
            clearInterval(timerInterval)
            document.getElementById("update_res").textContent = `You Win! Score: ${score}`
        }
    } else {
        setTimeout(() => {
            tile1.textContent = ''
            tile2.textContent = ''
        }, 1000)
    }
    openedTiles = []
}
function startTimer() {
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--
            document.getElementById("time_left").innerHTML = `Time Left: <b>${timer}s</b>`
        } else {
            clearInterval(timerInterval)
            document.getElementById("update_res").textContent = "Time's Up! Game Over!"
        }
    }, 1000)
}
function Reset() {
    clearInterval(timerInterval)
    timer = 150
    document.getElementById("time_left").innerHTML = "Time Left: <b>150s</b>"
    document.getElementById("score_1").textContent = "Your Score: 0"
    initGame()
}
window.onload = initGame;
