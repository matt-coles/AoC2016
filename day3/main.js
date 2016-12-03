const fs = require('fs')
const input = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
const validTriangles = t => (t[0]+t[1])>t[2]
const inputArray = input.split('\n').map(e => 
  e.split(" ")
  .filter(t => !!t)
  .map(t => +t)
  .sort((a,b) => a-b))
  .filter(validTriangles)
console.log(inputArray.length)
