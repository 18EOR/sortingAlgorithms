let elements= []
let elementsUI= []
let sortedArray= []

let numOfCompares = 0
let amount = 50
let delay = 4
let sortedIndex = null

const Colour = {
  red: '#EE5E5E',
  darkRed: '#D90000',
  grey: '#9D9D9D',
  black: '',
  white: '#FFFFFF',
  green: '#5ACD6A',
  blue: ''
}

initialize()

function initialize(){
  populateElements()
  createUI()
  randomise(elements)
  updateUI(elements)
  bindings()
  
  //Create Sorted array Ref
  sortedArray = elements.slice()
  sortedArray.sort((a, b) => a - b)
}

//#region 
function bindings(){
  $('#sort').bind("click", function(){
    bubbleSortVisual(elements, 0, 1, false)
  })

  $('#rand').bind("click", function(){
    randomise(elements)
  })

  $('#insert').bind("click", function(){
    insertionSortVisual(elements, 1, 0, undefined)
  })
}

function populateElements(){
  for(let i = 0; i < amount; i++){
    elements.push(Math.round(1 * (i+1) * 100) / 100)
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

function highlightElements(elements, colour){
  for(let i = 0; i < elements.length; i++){
    elements[i].style.backgroundColor = colour
  }
}

function colourSortedElements(array){
  //Check if any elements are in their final location and colour them green
  //Sort array
  array.sort((a, b) => a - b)
  console.log(array)
  //compaire to old array
}

function getElementHeightInNum(heightString){
  return heightString.substring(0, heightString.length -2)
}

function checkSortedElements(){
  //Check how many sorted elements
  getElementHeightInNum(elementsUI[2].style.height)

  for(let i=elements.length-1; i > 0; i--){
    numOfCompares++
    //console.log(`#${numOfCompares} Compairing if | ${getElementHeightInNum(elementsUI[i].style.height)} == ${sortedArray[i]}`)
    if(getElementHeightInNum(elementsUI[i].style.height) == sortedArray[i]){
      sortedIndex = i
    }else{
      break
    }
  }
  
  highlightElements(elementsUI.slice(sortedIndex, elementsUI.length), Colour.green)
  //console.log(`current sorted index is ${sortedIndex}`)
}


//#endregion


//#region Randomise
function randomise(array) {
  let currentIndex = array.length, temporaryValue, randomIndex
  
  // While there remain elements to shuffle.
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  //Reset Array
  updateUI(array)
  highlightElements(elementsUI, Colour.white)
  sortedIndex = null
  return array
}
//#endregion

//#region Bubble Sort
function bubbleSortVisual(array, index, round, madeAdjustment){
  if (index != 0){
    highlightElements([elementsUI[index-1], elementsUI[index]], Colour.white)
  }
  
  //Check if index is 1 less than array length {OR IF INDEX IS LABELED AS FULLY SORTED AND NO UNSORTED ELEMENTS AR EBEINH IT}
  if (index >= array.length-1 || index === sortedIndex){
    //[if] no adjustment was made then its fully sorted [else] reset for the next round of sorting 
    if (madeAdjustment == false){
      highlightElements(elementsUI, Colour.green)
      return
    }else{
      round++
      index = 0
      madeAdjustment = false
      checkSortedElements()
    }
  }

  highlightElements([elementsUI[index]], Colour.darkRed)
  highlightElements([elementsUI[index+1]], Colour.red)
  updateUI(array)

  setTimeout(sort, delay, array, index, round, madeAdjustment)
}

function sort(array, index, round, madeAdjustment){
  if (array[index] > array[index+1]){
    updateUI(array)
    setTimeout(bubbleSwap, delay, array, index) 
  }else{
    setTimeout(bubbleSortVisual, delay, array, index+1, round, madeAdjustment)
  }
}

function bubbleSwap(array, index, round, madeAdjustment){
  let temp = array[index]
  array[index] = array[index+1]
  array[index+1] = temp
  madeAdjustment = true

  updateUI(array)

  highlightElements([elementsUI[index]], Colour.red)
  highlightElements([elementsUI[index+1]], Colour.darkRed)

  setTimeout(bubbleSortVisual, delay, array, index+1, round, madeAdjustment)
}
//#endregion

function insertionSortVisual(array, currentIndex, indexToCheck, swapLocation){
  let print = {
    array: array,
    currentIndex: currentIndex,
    indexToCheck: indexToCheck,
    swapLocation: swapLocation
  }
  console.log(print)

  if(indexToCheck >= 0){
    highlightElements([elementsUI[currentIndex]], Colour.darkRed) 
    highlightElements([elementsUI[indexToCheck]], Colour.red) 
    if(array[currentIndex] < array[indexToCheck]){
      swapLocation = indexToCheck
     }
     if(indexToCheck === 0){
      setTimeout(insertionSortVisual, delay, array, currentIndex+1, currentIndex-1, swapLocation)
     }else{
      setTimeout(insertionSortVisual, delay, array, currentIndex, indexToCheck-1, swapLocation)
     }
  }
}

function insertionSortSwap(array, index, currentValue, swapIndex) {
  if(swapIndex != undefined){
    array.splice(index, 1)
    array.splice(swapIndex, 0, currentValue)
}
  updateUI(array)
  setTimeout(insertionSortVisual, delay, array, index+1)
}
