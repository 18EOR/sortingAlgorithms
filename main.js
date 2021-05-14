let elements= []
let elementsUI= []
let amount = 40


start()


function start(){
  populateElements()
  createUI()
  shuffle(elements)
  updateUI()
  bindings()
}

function bindings(){
  $('#sort').bind("click", function(){
    bubbleSort(elements)
    updateUI()
  })

  $('#rand').bind("click", function(){
    shuffle(elements)
    updateUI()
  })
}

function populateElements(){
  for(let i = 0; i < amount; i++){
    elements.push(2 * (i+1))
  }
}

function createUI(){
  let str = ""
  for(let i = 0; i < amount; i++){
    str += '<div class="element"></div>'
  }
  $('#parent').html(str)
  elementsUI = $('#parent').children()

  updateUI()
}

function updateUI(){
  for(let i = 0; i < amount; i++){
    elementsUI[i].style.height = elements[i] + "vh"
  }
}


//#region Algorithms
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  
  // While there remain elements to shuffle.
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function bubbleSort(array, round){
  let madeAdjustment = false
  let newArray = array
  if(round == undefined){
    round = 1
  }

  for(let i = 0; i < newArray.length-1; i++){
    if(newArray[i] > newArray[i+1]){
      madeAdjustment = true
      let tempStore = newArray[i]
      newArray[i] = newArray[i+1]
      newArray[i+1] = tempStore
    }
  }
  console.log("after sort round "+ round +": " + newArray)
  if(madeAdjustment == false){
    return newArray
  }else{
    bubbleSort(array, round+1)
  }
}

////#endregion