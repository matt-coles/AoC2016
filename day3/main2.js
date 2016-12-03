const fs = require('fs')
const input = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
const validTriangles = t => (t[0]+t[1])>t[2]
const toColumns = (_, idx, arr) => idx % 3 === 0 ? 
  [
    [arr[idx][0], arr[idx+1][0], arr[idx+2][0]],
    [arr[idx][1], arr[idx+1][1], arr[idx+2][1]],
    [arr[idx][2], arr[idx+1][2], arr[idx+2][2]]
  ] :  ''

const inputArray = 
  input
  .trim()
  .split('\n')
  .map(e => e
    .trim()
    .split(/\s+/)
    .map(t => +t))
  .map(toColumns)
  .filter((_, idx) => !(idx % 3))
  .reduce((p, c) => p.concat(c), [])
  .map(e => e
    .sort((a,b) => a-b))
  .filter(validTriangles)

console.log(inputArray.length)
