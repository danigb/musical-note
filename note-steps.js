var PITCHCLASSES = 'CDEFGABCDEFGAB'
var REGEX = /^[A-G]/

module.exports = function noteSteps (a, b, descendent) {
  if (!REGEX.test(a)) throw Error('Invalid note: ' + a)
  var indexA = PITCHCLASSES.indexOf(a[0])
  if (REGEX.test(b)) {
    var indexB = PITCHCLASSES.indexOf(b[0], indexA)
    var mod = descendent ? -8 : 1
    return indexB - indexA + mod
  } else {
    var dest = indexA + ((+b - 1) % 7)
    if (dest < 0) dest += 9
    return PITCHCLASSES[dest]
  }
}
