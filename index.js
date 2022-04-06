let moveSpeed = 1.7, grativy = 3, stepBird = 70, pipeQuantity = 0, score_val = 0, moveBirdId, createPipeId, movePipeId;
let statusGame = "waiting";
let bird = document.querySelector('#birdId')
let background = document.querySelector(".background")
let score = document.querySelector(".score")
let scoreVal = document.querySelector(".score_val")
let button = document.querySelector("button")
let birdProps = bird.getBoundingClientRect()
let topInitial = birdProps.y
let backgroundProps = background.getBoundingClientRect()
scoreVal.innerHTML = score_val

button.innerHTML="Play"

button.addEventListener("click", function() {
  if(statusGame === "waiting"){
    statusGame = "playing"
    button.hidden = true
  }
  if(statusGame === "die"){
    button.innerHTML="Play"
    score_val=0
    scoreVal.innerHTML=0
    birdProps.y = topInitial
    bird.style.top = topInitial + "px"
    statusGame = "waiting"
    let pipe = document.querySelectorAll(".pipe")
    pipe.forEach(e => {
      e.remove()
    })
  }
  play()
})

  background.addEventListener("click", function() {
    if(statusGame !== "playing") return
    bird.style.transform = "rotate(-45deg)"
    birdProps.y -= stepBird
    bird.style.top = birdProps.y + "px"
    bird.src = "images/Bird-2.png"
  })
  
function play() {
  if(statusGame !== "playing") return
  function moveBird() {
    bird.style.transform = "rotate(0deg)"
    if(birdProps.y <0 ){
      birdProps.y = 0
      bird.style.y = 0 + "px"
    }
    if(birdProps.bottom > backgroundProps.height){
      statusGame = "die"
    } else {
      birdProps.y += grativy 
      bird.style.top = birdProps.y + "px"
      bird.src = "images/Bird.png"
    }
    moveBirdId = requestAnimationFrame(moveBird)
  }
  requestAnimationFrame(moveBird)
  
  function createPipe() {
    pipeQuantity++
    if(pipeQuantity > 110) {
      pipeQuantity = 0;
      let pipeup = document.createElement("div")
      let pipedown = document.createElement("div")
      let heightRandom = Math.floor(Math.random() * 40) + 20
      let idRandom = Math.floor(Math.random() *9999999 + 0)
      pipeup.className = "pipeup pipe"
      pipedown.className = "pipedown pipe"
      pipeup.setAttribute("tittle", idRandom)
      pipedown.setAttribute("tittle", idRandom)
      pipeupProps = pipeup.getBoundingClientRect()
      pipedownProps = pipedown.getBoundingClientRect()
      
      pipedown.style.height = heightRandom + "vh"
      pipeup.style.height = 90 - heightRandom - 25 + "vh"
      background.appendChild(pipeup)
      background.appendChild(pipedown)
    }
    createPipeId = requestAnimationFrame(createPipe)
  }
  requestAnimationFrame(createPipe)
  
  let id = 0;
  
  function movePipe() {
    let pipe = document.querySelectorAll(".pipe")
    pipe.forEach((e) => {
      let pipeProps = e.getBoundingClientRect()
      e.style.left = pipeProps.left - moveSpeed + "px"
      if(pipeProps.right <0){
        e.remove()
      }
      if(birdProps.right > pipeProps.left && birdProps.left < pipeProps.right){
        if(e.className == "pipeup pipe" && birdProps.top < pipeProps.bottom){
          statusGame="die"
        }
        if(e.className == "pipedown pipe" && birdProps.bottom > pipeProps.top){
          statusGame="die"
        }
        if(e.getAttribute("tittle")!=id){
          id = e.getAttribute("tittle")
          score_val++
          scoreVal.innerHTML = score_val 
        }
      }
      if(birdProps.left > pipeProps.right){
      }
    })
    movePipeId = requestAnimationFrame(movePipe)
  }
  requestAnimationFrame(movePipe)
 
 function die() {
   if(statusGame === "die"){
     button.hidden = false
     button.innerHTML = "Replay"
     cancelAnimationFrame(movePipeId)
     cancelAnimationFrame(moveBirdId)
     cancelAnimationFrame(createPipeId)
     return
   }
    requestAnimationFrame(die)
 }
  requestAnimationFrame(die)
}