const fs = require('fs')
const input = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
const validTriangles = t => (t[0]+t[1])>t[2]
const toColumns = (_, idx, arr) => [ arr[idx-(idx%3)][idx%3], arr[idx-(idx%3)+1][idx%3], arr[idx-(idx%3)+2][idx%3] ]

const inputArray = 
  input
  .trim()
  .split('\n')
  .map(e => e
    .trim()
    .split(/\s+/)
    .map(t => +t))
  .map(toColumns)
  .map(e => e
    .sort((a,b) => a-b))
  .filter(validTriangles)

console.log(inputArray.length)
