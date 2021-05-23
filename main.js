let elements= []
let elementsUI= []
let amount = 70
const COLOUR_GREEN = "rgb(99, 231, 116)"
const COLOUR_WHITE = "rgb(255,255,255)"
const COLOUR_BLUE = "rgb(135, 209, 255)"

start()


function start(){
  populateElements()
  createUI()
  randomise(elements)
  updateUI(elements)
  bindings()
}

function bindings(){
  $('#sort').bind("click", function(){
    bubbleSortVisual(elements, 0, 1, false)
  })

  $('#rand').bind("click", function(){
    randomise(elements)
  })

  $('#insert').bind("click", function(){
    insertionSortVisual(elements)
  })
}

function populateElements(){
  for(let i = 0; i < amount; i++){
    elements.push(1.2 * (i+1))
  }
}

function createUI(){
  let str = ""
  for(let i = 0; i < amount; i++){
    str += '<div class="element"></div>'
  }
  $('#parent').html(str)
  elementsUI = $('#parent').children()

  updateUI(elements)
}

function updateUI(array){
  for(let i = 0; i < amount; i++){
    elementsUI[i].style.height = array[i] + "vh"
  }
}

function highlightElements(el, colour){

  switch(colour){
    case "Green":
      colour = COLOUR_GREEN
      break
    case "White":
      colour = COLOUR_WHITE
      break
    case "Blue":
    colour = COLOUR_BLUE
    break
  }

  for(let i = 0; i < el.length; i++){
    el[i].style.backgroundColor = colour
  }
  // if(highlight === true){
  //   for(let i = 0; i < el.length; i++){
  //     el[i].style.backgroundColor = highlightColour
  //   }
  // }else{
  //   for(let i = 0; i < el.length; i++){
  //     el[i].style.backgroundColor = defaultColour
  //   }
  // }
}

//#region Randomise
function randomise(array) {
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
  updateUI(array)
  return array;
}
//#endregion

//#region Bubble Sort
function bubbleSortVisual(array, index, round, madeAdjustment){
  if (index != 0){
    highlightElements([elementsUI[index-1], elementsUI[index]], "Blue")
  }
  
  //Check if index is 1 less than array length
  if (index >= array.length-1){
    //[if] no adjustment was made then its fully sorted [else] reset for the next round of sorting 
    if (madeAdjustment == false || madeAdjustment == false){
      highlightElements(elementsUI, "White")
      return
    }else{
      round++
      index = 0
      madeAdjustment = false
    }
  }

  highlightElements([elementsUI[index], elementsUI[index+1]], "Green")
  updateUI(array)

  setTimeout(sort, 4, array, index, round, madeAdjustment)
}

function sort(array, index, round, madeAdjustment){
  if (array[index] > array[index+1]){
    let temp = array[index]
    array[index] = array[index+1]
    array[index+1] = temp
    madeAdjustment = true
  }
  updateUI(array)

  setTimeout(bubbleSortVisual, 4, array, index+1, round, madeAdjustment)
}
//#endregion

function insertionSortVisual(array, index, check){
  if(index == undefined){
    index = 1
    check = index - 1
  }

  highlightElements([elementsUI[index], elementsUI[index-1]], true)
}

//check current index and if element lower is bigger then put current index before it