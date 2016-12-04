const fs = require('fs')
const input = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
const frequency = (el, arr) => arr.filter(e => e == el).length
const sectorID = e => e.replace(/\D+(\d+)\D+/g, '$1')
const ciphered = e => e.replace(/(\D+)-\d.*/g, '$1')
const shift = (word, amt) => word.split('').map(a => {
  if (a === '-') return ' '
  else {
    const code = a.charCodeAt(0)
    if (code+(amt%26) > 122) return String.fromCharCode(code+(amt%26)-26)
    else return String.fromCharCode(code+(amt%26))
  }
}).join('')

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
const sectorIDSum = validRooms.map(sectorID)
  .map(e => +e)
  .reduce((p, c) => p+c,0)

console.log("Sector ID sum: " + sectorIDSum) // Part 1 solution

const actualNames = validRooms
  .map(e => { return { c: ciphered(e), n: sectorID(e) } })
  .map(e => { return { c: shift(e.c, e.n), n: e.n }})
  .filter(e => !!~e.c.indexOf('northpole'))

console.log(actualNames) // Part 2 solution

