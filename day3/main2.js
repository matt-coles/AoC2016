const fs = require('fs')
const input = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
const validTriangles = t => (t[0]+t[1])>t[2]
const emptySpaces = t => !!t
const toColumns = (_, idx, arr) => ((idx % 3 === 0 || idx === 0) && idx+1 != arr.length) ? 
  [
    [arr[idx][0], arr[idx+1][0], arr[idx+2][0]],
    [arr[idx][1], arr[idx+1][1], arr[idx+2][1]],
    [arr[idx][2], arr[idx+1][2], arr[idx+2][2]]
  ] :  ''

const inputArray = input.split('\n').map(e =>
  e.split(" ")
  .filter(emptySpaces)
  .map(t => +t))
    .filter(e => e.length)
    .map(toColumns)
    .filter(emptySpaces)
    .reduce((p, c) => p.concat(c), [])
    .map(e => e.sort((a,b) => a-b))
    .filter(validTriangles)

console.log(inputArray.length)
