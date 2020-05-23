document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll(".grid div")
    const scoreDisplay = document.querySelector("span")
    const startBtn = document.querySelector(".start")

    const width = 10;
      
    let appleIndex = 0 //first div in our grid
    let currentSnake =[2,1,0]  //so the div in our grid that has the value 2 (is the Head) 
                                //div with the value of 0 is the tail and all 1's being the body
    let direction = 1;
    let score = 0
    let speed =0.9
    let intervalTime =0
    let interval = 0

    //to start and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove("snake"))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score =0 
        randomApple()
        direction=1
        scoreDisplay.innerText = score
        intervalTime = 1000;
        currentSnake =[2,1,0]
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes,intervalTime)
    }

    //function that deals with all of the outcomes of the snake moving

    function moveOutcomes() {
        
        //deals with snake hitting border and hitting itself
        if (
            (currentSnake[0] + width >= (width*width) && direction === width) || //if snake hits the bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits the right wall
            (currentSnake[0] % width === 0  && direction ===  -1 ) || //if snake hits the left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if the snake hits the top wall
            squares[currentSnake[0] + direction].classList.contains("snake")
        ) {
            alert(`you lost hahahah, your score is ${score}`)
            return clearInterval(interval) //stop everything from running if anything happens
            
        }

        const tail = currentSnake.pop() //removes last item of the snake array so the tail disappears
        squares[tail].classList.remove("snake")
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        //deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add("snake")
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed //increase the speed because the speed is 0.9 and the interval time gets smaller
            interval = setInterval(moveOutcomes,intervalTime )
        }
        squares[currentSnake[0]].classList.add("snake")

    }

    //generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains("snake"))
        squares[appleIndex].classList.add("apple")

    }

 


    //what happens when each key is pressed, ie where the head of the snake goes for now
    function control(e) {
        
        if(e.keyCode === 39) {
            direction = 1 //if we press the right arrow on our keyboard the snake will move right
        } else if (e.keyCode === 38) {
            direction = -width //if we press up arrow the snake will move back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 //if we press left the snake will move to the div to the left
        } else if (e.keyCode === 40) {
            direction = +width // if we go down the snake will move up ten divs appearing to go down one block
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)


})