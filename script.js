const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
      {
          "name": "Удар когтистой лапой",
          "physicalDmg": 3, // физический урон
          "magicDmg": 0,    // магический урон
          "physicArmorPercents": 20, // физическая броня
          "magicArmorPercents": 20,  // магическая броня
          "cooldown": 0     // ходов на восстановление
      },
      {
          "name": "Огненное дыхание",
          "physicalDmg": 0,
          "magicDmg": 4,
          "physicArmorPercents": 0,
          "magicArmorPercents": 0,
          "cooldown": 3
      },
      {
          "name": "Удар хвостом",
          "physicalDmg": 2,
          "magicDmg": 0,
          "physicArmorPercents": 50,
          "magicArmorPercents": 0,
          "cooldown": 2
      },
  ]
}
const player = {
  maxHealth: 10,
  name: "Евстафий",
  moves: [
    {
        "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 50,
        "cooldown": 0
    },
    {
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 4
    },
    {
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 3
    },
    {
        "name": "Магический блок",
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmorPercents": 100,
        "magicArmorPercents": 100,
        "cooldown": 4
    },
  ]
}
let playerHelthInd = document.querySelector('#player_helth')
let form = document.querySelector('#choose_difficult')
let menu = document.querySelector('.start_menu')
let interface = document.querySelector('.wrapper')
let playerHelth = player.maxHealth
const getData = (e) => {
  e.preventDefault()
  const res = form.querySelector('select').value
  setDifficult(res)
  menu.style.display = 'none'
  interface.style.display = 'inline-block'
}
const setDifficult = (res) => {
    playerHelthInd.innerHTML = `${parseFloat(res).toFixed(1)}`

}
form.addEventListener('submit', getData)
function random(min, max) {         
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let btn = document.querySelector('#start')

let monsterHelthInd = document.querySelector('#monster_helth')
let choiceList = document.querySelector('.choice_list')
let indicators = document.querySelector('#monster')
let inf = document.querySelector('.inf_attack')
let playerMoves = player.moves
let monsterMoves = monster.moves
let coolDown1 = 0
let coolDown2 = 0
let coolDown3 = 0
let monsterHelth = monster.maxHealth

for (let i = 0; i < playerMoves.length; i++) {
  inf.insertAdjacentHTML(
    'beforeend',
    `<div class="move">
    <p>${playerMoves[i].name}</p>
    <p>Физ.урон: ${playerMoves[i].physicalDmg}</p>
    <p>Маг.урон: ${playerMoves[i].magicDmg}</p>
    <p>Физ.защита: ${playerMoves[i].physicArmorPercents}</p>
    <p>Маг.защита: ${playerMoves[i].magicArmorPercents}</p>
    <p>Перезарядка: ${playerMoves[i].cooldown}</p>
  </div>`
  )
  
}

for (let i = 0; i < playerMoves.length; i++) {
  choiceList.insertAdjacentHTML(
    'beforeend',
    `<button class='game_btn' id=move_${i}>${playerMoves[i].name}</button><br>`
  )
  
}

playerHelthInd.insertAdjacentHTML(
  'beforeend',
  `${playerHelth.toFixed(1)}`
)
monsterHelthInd.insertAdjacentHTML(
  'beforeend',
  `${monsterHelth.toFixed(1)}`
)

let monsterChoice = monsterMoves[random(0, 2)]

let move_0 = document.querySelector('#move_0')
let move_1 = document.querySelector('#move_1')
let move_2 = document.querySelector('#move_2')
let move_3 = document.querySelector('#move_3')

let playerHelthIndData = playerHelthInd.innerHTML
let monsterHelthIndData = monsterHelthInd.innerHTML

const checkHelth = () => {
  playerHelthIndData = playerHelthInd.innerHTML
  monsterHelthIndData = monsterHelthInd.innerHTML
  if(monsterHelthIndData == 0 || monsterHelthIndData <= 0){
    alert('Вы выиграли')
    location = location
  }else if(playerHelthIndData == 0 || playerHelthIndData <= 0 ) {
    alert('Вы проиграли')
    location = location
  }
}

const fight = (playerChoice, playerHelth, monsterHelth, monsterChoice) => {
  monsterAttack = (playerHelth, monsterChoice, playerChoice) => {
    if(monsterChoice.physicalDmg){
      if (playerChoice.physicArmorPercents) {
        let blockDmg = monsterChoice.physicalDmg * playerChoice.physicArmorPercents / 100
        let pureDmg = monsterChoice.physicalDmg - blockDmg
        playerHelth = playerHelth - pureDmg
        playerHelthInd.innerHTML = `${playerHelth.toFixed(1)}`
      }else{
        playerHelth = playerHelth - monsterChoice.physicalDmg
        playerHelthInd.innerHTML = `${playerHelth.toFixed(1)}`
      }
    }
    if (monsterChoice.magicDmg) {
      if (playerChoice.magicArmorPercents) {
        let blockDmg = monsterChoice.magicDmg * playerChoice.magicArmorPercents / 100
        let pureDmg = monsterChoice.magicDmg - blockDmg
        playerHelth = playerHelth - pureDmg
        playerHelthInd.innerHTML = `${playerHelth.toFixed(1)}`
      }else{
        playerHelth = playerHelth - monsterChoice.magicDmg
        playerHelthInd.innerHTML = `${playerHelth.toFixed(1)}`
      }
    }
  }
  playerAttack = (playerChoice, monsterHelth, monsterChoice) => {

    if(playerChoice.physicalDmg){
      if (monsterChoice.physicArmorPercents) {
        let blockDmg = playerChoice.physicalDmg * monsterChoice.physicArmorPercents / 100

        let pureDmg = playerChoice.physicalDmg - blockDmg
        monsterHelth = monsterHelth - pureDmg
        monsterHelthInd.innerHTML = `${monsterHelth.toFixed(1)}`
      }else{
        monsterHelth = monsterHelth - playerChoice.physicalDmg
        monsterHelthInd.innerHTML = `${monsterHelth.toFixed(1)}`
      }
    }
    if (playerChoice.magicDmg) {
      if (monsterChoice.magicArmorPercents) {
        let blockDmg = playerChoice.magicDmg * monsterChoice.magicArmorPercents / 100
        let pureDmg = playerChoice.magicDmg - blockDmg
        monsterHelth = monsterHelth - pureDmg
        monsterHelthInd.innerHTML = `${monsterHelth.toFixed(1)}`
      }else{
        monsterHelth = monsterHelth - playerChoice.magicDmg
        monsterHelthInd.innerHTML = `${monsterHelth.toFixed(1)}`
      }
    }
    if (playerChoice.magicDmg == 0 || playerChoice.physicalDmg == 0) {
    }
  }
  let contM = monsterAttack(playerHelth, monsterChoice, playerChoice)
  let contP = playerAttack(playerChoice, monsterHelth, monsterChoice)
  
  if(playerHelthInd.innerHTML == 0 || playerHelthInd.innerHTML < 0 ) {
    return 'lose'
  }
  if(monsterHelthInd.innerHTML == 0 || monsterHelthInd.innerHTML < 0) {
    return 'win'
  }

  return 'confirm'
}
 console.log(monsterChoice)
 indicators.insertAdjacentHTML(
   'beforeend',
   `${monsterChoice.name}<br>
   Физ.урон:${monsterChoice.physicalDmg}<br>
   Маг.урон:${monsterChoice.magicDmg}<br>
   Физ.защита:${monsterChoice.physicArmorPercents}<br>
   Маг.защита:${monsterChoice.magicArmorPercents}<br>`
 )
let handle0 = () => {
  
  playerHelthIndData = playerHelthInd.innerHTML
  monsterHelthIndData = monsterHelthInd.innerHTML
  
  let playerChoice = playerMoves[0]
 
 
  let resultFight = fight(playerChoice, playerHelthIndData, monsterHelthIndData, monsterChoice)
  console.log(monsterChoice)
  
  monsterChoice = monsterMoves[random(0, 2)]
  indicators.innerHTML = `${monsterChoice.name}<br>
  Физ.урон:${monsterChoice.physicalDmg}<br>
  Маг.урон:${monsterChoice.magicDmg}<br>
  Физ.защита:${monsterChoice.physicArmorPercents}<br>
  Маг.защита:${monsterChoice.magicArmorPercents}<br>`
  console.log(playerHelthIndData)
  coolDown1--
  coolDown2--
  coolDown3--
  if(coolDown1 == 0){
    move_1.addEventListener('click', handle1)
      move_1.style.background = 'none'
  }
  if(coolDown2 == 0){
    move_2.addEventListener('click', handle2)
      move_2.style.background = 'none'
  }
  if(coolDown3 == 0){
    move_3.addEventListener('click', handle3)
      move_3.style.background = 'none'
  }
  checkHelth()

}
let handle1 = () => {

  coolDown1 = 4
  let playerChoice = playerMoves[1]
  playerHelthIndData = playerHelthInd.innerHTML
  monsterHelthIndData = monsterHelthInd.innerHTML
  let resultFight = fight(playerChoice, playerHelthIndData, monsterHelthIndData, monsterChoice)
  console.log(monsterChoice)
  monsterChoice = monsterMoves[random(0, 2)]
  indicators.innerHTML = `${monsterChoice.name}<br>
  Физ.урон:${monsterChoice.physicalDmg}<br>
  Маг.урон:${monsterChoice.magicDmg}<br>
  Физ.защита:${monsterChoice.physicArmorPercents}<br>
  Маг.защита:${monsterChoice.magicArmorPercents}<br>`
  coolDown2--
  coolDown3--

  if(coolDown2 == 0){
    move_2.addEventListener('click', handle2)
      move_2.style.background = 'none'
  }
  if(coolDown3 == 0){
    move_3.addEventListener('click', handle3)
      move_3.style.background = 'none'
  }

  if(coolDown1){
    move_1.style.background = 'red'
    move_1.removeEventListener('click', handle1)
    
  }
  checkHelth()
 
}
let handle2 = () => {

  coolDown2 = 3
  let playerChoice = playerMoves[2]
  playerHelthIndData = playerHelthInd.innerHTML
  monsterHelthIndData = monsterHelthInd.innerHTML
  let resultFight = fight(playerChoice, playerHelthIndData, monsterHelthIndData, monsterChoice)
  console.log(monsterChoice)
  monsterChoice = monsterMoves[random(0, 2)]
  indicators.innerHTML = `${monsterChoice.name}<br>
  Физ.урон:${monsterChoice.physicalDmg}<br>
  Маг.урон:${monsterChoice.magicDmg}<br>
  Физ.защита:${monsterChoice.physicArmorPercents}<br>
  Маг.защита:${monsterChoice.magicArmorPercents}<br>`
  
  coolDown1--

  coolDown3--

  if(coolDown1 == 0){
    move_1.addEventListener('click', handle1)
      move_1.style.background = 'none'
  }

  if(coolDown3 == 0){
    move_3.addEventListener('click', handle3)
      move_3.style.background = 'none'
  }

  if(coolDown2){
    move_2.style.background = 'red'
    move_2.removeEventListener('click', handle2)
    
  }
  checkHelth()
}
let handle3 = () => {
  
  coolDown3 = 4
  let playerChoice = playerMoves[3]
  playerHelthIndData = playerHelthInd.innerHTML
  monsterHelthIndData = monsterHelthInd.innerHTML
  let resultFight = fight(playerChoice, playerHelthIndData, monsterHelthIndData, monsterChoice)
  console.log(monsterChoice)
  monsterChoice = monsterMoves[random(0, 2)]
  indicators.innerHTML = `${monsterChoice.name}<br>
  Физ.урон:${monsterChoice.physicalDmg}<br>
  Маг.урон:${monsterChoice.magicDmg}<br>
  Физ.защита:${monsterChoice.physicArmorPercents}<br>
  Маг.защита:${monsterChoice.magicArmorPercents}<br>`
  
  coolDown1--
  coolDown2--

  if(coolDown1 == 0){
    move_1.addEventListener('click', handle1)
      move_1.style.background = 'none'
  }
  if(coolDown2 == 0){
    move_2.addEventListener('click', handle2)
      move_2.style.background = 'none'
  }

  
  if(coolDown3){
    move_3.style.background = 'red'
    move_3.removeEventListener('click', handle3)
    
  }
  checkHelth()
}

  move_0.addEventListener('click', handle0)
  move_1.addEventListener('click', handle1)
  move_2.addEventListener('click', handle2)
  move_3.addEventListener('click', handle3)
