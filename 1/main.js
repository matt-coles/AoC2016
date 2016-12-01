const fs = require('fs')

let input = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
let orientation = 'N'
let compass = ['N', 'E', 'S', 'W']
let x = 0;
let y = 0;
let places = []
let inputArray = input.split(',')
let notFound = true

const rotate = (arr, reverse) => {
  if (reverse)
    arr.unshift(arr.pop());
  else
    arr.push(arr.shift());
  return arr
}

const move = (amount) => {
  if (orientation == 'N') incr(false, amount)
  if (orientation == 'E') incr(true, amount)
  if (orientation == 'S') incr(false, -amount)
  if (orientation == 'W') incr(true, -amount)
}

const checkVisited = (x1, y1) => {
  for (place of places) {
    if (place[0] == x1 && place[1] == y1 && notFound) {
      console.log("Actual distance is: " + (Math.abs(x1)+Math.abs(y1)) + " (" + x1 + ", " + y1 + ")")
      notFound = false
    }
  }
  places.push([x,y])
}

const incr = (horizontal, amount) => {
  for (i = 0; i < Math.abs(amount); i++) {
    if (horizontal)
      x += amount/Math.abs(amount)
    else
      y += amount/Math.abs(amount)
    checkVisited(x, y)
  }
}


for (instruction of inputArray) {
  instruction = instruction.trim()
  let direction = instruction.slice(0,1)
  let amount = +instruction.slice(1, instruction.length)
  orientation = rotate(compass, direction === 'L')[0]
  move(amount)
}

console.log("Whole distance is: " + (Math.abs(x)+Math.abs(y)) + " (" + x + ", " + y + ")")
