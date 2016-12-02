const fs = require('fs')

const input = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
const inputArray = input.trim().split('\n')
const handler = {
  set: (target, name, val) => {
    if (val === 'U' && target.y > 0 && grid[target.y-1][target.x] != '')
      target.y -= 1
    if (val === 'D' && target.y < 4 && grid[target.y+1][target.x] != '')
      target.y += 1
    if (val === 'R' && target.x < 4 && grid[target.y][target.x+1] != '')
      target.x += 1
    if (val === 'L' && target.x > 0 && grid[target.y][target.x-1] != '')
      target.x -= 1
  }
}

const grid = [
  ['', '', 1, '', ''],
  ['', 2,  3,  4, ''],
  [ 5, 6,  7,  8,  9],
  ['', 'A', 'B', 'C', ''],
  ['', '', 'D', '', '']
]


const position = new Proxy({x: 0, y: 2}, handler)
let result = ''
for (line of inputArray) {
  lineArray = [...line]
  for (char of lineArray) 
    position.update = char
  result += ''+grid[position.y][position.x]
}
console.log('Passcode should be: ' + result)
