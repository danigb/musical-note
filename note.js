'use strict'

var enharmonics = require('enharmonics')
var Interval = require('musical-interval')

module.exports = Note

var NOTE = /^([a-gA-G])(#{0,2}|b{0,2})(-?[0-9]{0,1})$/
var CHROMATIC = 'C Db D Eb E F F# G Ab A Bb B'.split(' ')
var SEMITONES = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }

function Note (name) {
  if (!(this instanceof Note)) return new Note(name)

  var match = NOTE.exec(name)
  if (!match) throw Error('Invalid note name: ' + name)

  this.name = match[1].toUpperCase() + match[2]
  this.oct = match[3] ? +match[3] : 4
  var alter = this.name.length - 1
  if (this.name[1] === 'b') alter = -1 * alter
  this.midi = SEMITONES[this.name[0]] + alter + 12 * (this.oct + 1)
  this.freq = Math.pow(2, (this.midi - 69) / 12) * 440
}

Note.prototype.enharmonics = function () {
  return enharmonics(this.name, this.oct)
}

var PITCHCLASSES = 'CDEFGABCDEFGAB'
Note.prototype.transpose = function (interval) {
  interval = new Interval(interval)
  var index = PITCHCLASSES.indexOf(this.name[0])
  var pitchClass = PITCHCLASSES[index + interval.num - 1]
  var midi = this.midi + interval.dist + 12 * interval.oct
  return Note.fromMidi(midi, pitchClass)
}

Note.fromMidi = function (midi, pitchClass) {
  var name = CHROMATIC[midi % 12]
  var oct = Math.floor(midi / 12) - 1
  return new Note(pitchClass && pitchClass !== name[0] ? enharmonics(name, oct, pitchClass)[0] : name + oct)
}
