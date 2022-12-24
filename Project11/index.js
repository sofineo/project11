const darkModeBtn = document.querySelector(".dark-mode")
const lightModeBtn = document.querySelector(".light-mode")
const buttonPlay = document.querySelector(".play")
const buttonStop = document.querySelector(".stop")
const buttonAdd = document.querySelector(".add")
const buttonDeduct = document.querySelector(".deduct")
const buttonFlorest = document.querySelector(".cardFlorest")
const buttonRain = document.querySelector(".cardRain")
const buttonCoffeeshop = document.querySelector(".cardCoffeeshop")
const buttonFireplace = document.querySelector(".cardFireplace")
const volumeFlorest = document.querySelector("#florestVolume")
const volumeRain = document.querySelector("#rainVolume")
const volumeCoffeeshop = document.querySelector("#coffeeshopVolume")
const volumeFireplace = document.querySelector("#fireplaceVolume")
const minutesDisplay = document.querySelector(".minutes")
const secondsDisplay = document.querySelector(".seconds")
let timer
const soundFlorest = new Audio("./Audios/Floresta.wav")
const soundRain = new Audio("./Audios/Chuva.wav")
const soundCoffeeshop = new Audio("./Audios/Cafeteria.wav")
const soundFireplace = new Audio("./Audios/Lareira.wav")
const soundBtn = new Audio("./Audios/audiobutton.wav")
const soundTimesUp = new Audio("./Audios/timerUp.mp3")


darkModeBtn.addEventListener('click', ()=>{
  soundBtn.play()
  hideToggle(darkModeBtn,lightModeBtn)
  switchTheme()
})

lightModeBtn.addEventListener('click', ()=>{
  soundBtn.play()
  hideToggle(darkModeBtn,lightModeBtn)
  switchTheme()
})

buttonPlay.addEventListener('click', ()=> {
  soundBtn.play()
  countDown()
})

buttonStop.addEventListener('click', ()=>{
  soundBtn.play()
  stopCountDown()
})

buttonAdd.addEventListener('click', ()=>{
  soundBtn.play()
  addFiveMinutes()
})

buttonDeduct.addEventListener('click', ()=>{
  soundBtn.play()
  deductFiveMinutes()
})

buttonFlorest.addEventListener('click',()=>{
  soundFlorest.play()
  soundFlorest.loop = true
  soundRain.pause()
  soundCoffeeshop.pause()
  soundFireplace.pause()
  buttonFlorest.classList.add('selected')
  buttonRain.classList.remove('selected')
  buttonCoffeeshop.classList.remove('selected')
  buttonFireplace.classList.remove('selected')
})

buttonRain.addEventListener('click',()=>{
  soundFlorest.pause()
  soundRain.play()
  soundRain.loop = true
  soundCoffeeshop.pause()
  soundFireplace.pause()
  buttonFlorest.classList.remove('selected')
  buttonRain.classList.add('selected')
  buttonCoffeeshop.classList.remove('selected')
  buttonFireplace.classList.remove('selected')
})

buttonCoffeeshop.addEventListener('click',()=>{
  soundFlorest.pause()
  soundRain.pause()
  soundCoffeeshop.play()
  soundCoffeeshop.loop = true
  soundFireplace.pause()
  buttonFlorest.classList.remove('selected')
  buttonRain.classList.remove('selected')
  buttonCoffeeshop.classList.add('selected')
  buttonFireplace.classList.remove('selected')
})

buttonFireplace.addEventListener('click',()=>{
  soundFlorest.pause()
  soundRain.pause()
  soundCoffeeshop.pause()
  soundFireplace.play()
  soundFireplace.loop = true
  buttonFlorest.classList.remove('selected')
  buttonRain.classList.remove('selected')
  buttonCoffeeshop.classList.remove('selected')
  buttonFireplace.classList.add('selected')
})


function hideToggle(button1,button2) {
  button1.classList.toggle('hide')
  button2.classList.toggle('hide')
}

function switchTheme() {
  if (darkModeBtn.classList.contains('hide')) {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }
  else if (lightModeBtn.classList.contains('hide')){
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme)

  if (currentTheme === 'dark') {
    hideToggle(darkModeBtn,lightModeBtn)
  } 
}


function addFiveMinutes() {
  let minutes = Number(minutesDisplay.textContent)
  let newMinutes = minutes + 5
  if (newMinutes >= 99) {
    newMinutes = 99
  }
  return minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
}

function deductFiveMinutes() {
  let minutes = Number(minutesDisplay.textContent)
  let newMinutes = minutes - 5
  if (newMinutes <= 0) {
    newMinutes = 0
  }
  return minutesDisplay.textContent = String(newMinutes).padStart(2,"0")
}

function countDown() {
  timer = setTimeout(()=>{
    let minutes = Number(minutesDisplay.textContent)
    let seconds = Number(secondsDisplay.textContent)
    let timesUp = seconds <= 0 && minutes <= 0

    if (seconds <= 0) {
      seconds = 60
      minutes--
    }
    seconds--

    if (timesUp) {
          soundTimesUp.play()
          return
        }
    secondsDisplay.textContent = String(seconds).padStart(2,"0")
    minutesDisplay.textContent = String(minutes).padStart(2, "0")
    countDown()
  }, 1000)
}

function stopCountDown() {
  clearTimeout(timer)
}

volumeFlorest.oninput = ()=>{

}

volumeFlorest.addEventListener('mousemove', ()=>{
  let volume = volumeFlorest.value / 100
  soundFlorest.volume = volume
})

volumeRain.addEventListener('mousemove', ()=>{
  let volume = volumeRain.value / 100
  soundRain.volume = volume
})

volumeCoffeeshop.addEventListener('mousemove', ()=>{
  let volume = volumeCoffeeshop.value / 100
  soundCoffeeshop.volume = volume
})

volumeFireplace.addEventListener('mousemove', ()=>{
  let volume = volumeFireplace.value / 100
  soundFireplace.volume = volume
})
