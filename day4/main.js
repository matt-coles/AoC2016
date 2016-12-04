const fs = require('fs')
const input = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
const frequency = (el, arr) => arr.filter(e => e == el).length

const inputArray = input.trim().split('\n')
const encryption = inputArray
  .map(e => e
    .replace(/-/g, '')
    .replace(/([a-z]+).*/g, '$1')
    .split(''))
  .map(e => e
    .map((el, idx, arr) => { return { letter: el, freq: frequency(el, arr) }}) // pre calculate frequencies to improve perf
    .filter((el, idx, arr) => arr.findIndex(w => w.letter == el.letter) == idx)
    .sort((a, b) => {
      if (a.freq > b.freq) return -1
      else if (b.freq > a.freq) return 1
      else return a.letter.localeCompare(b.letter)
    })
    .slice(0, 5)
    .map(el => el.letter)
    .join(''))

const validRooms = inputArray.filter((e, idx) => e.replace(/.+\[(\w+)\]/g, '$1') === encryption[idx])
const sectorIDSum = validRooms.map(e => e.replace(/\D+(\d+)\D+/g, '$1'))
  .map(e => +e)
  .reduce((p, c) => p+c,0)

console.log("Sector ID sum: " + sectorIDSum) // Part 1 solution
