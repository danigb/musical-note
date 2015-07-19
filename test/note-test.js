var vows = require('vows')
var assert = require('assert')
var Note = require('../')

vows.describe('Note').addBatch({
  'parse notes': function () {
    var note = new Note('c#4')
    assert.equal(note.name, 'C#')
    assert.equal(note.oct, 4)
    assert.equal(note.midi, 61)
  },
  'default octave is 4': function () {
    assert.equal(new Note('d').oct, 4)
  },
  'note freq': function () {
    assert.equal(new Note('a4').freq, 440)
  },
  'from midi': function () {
    assert.equal(Note.midiName(60), 'C4')
    assert.equal(Note.midiName(69), 'A4')
    assert.equal(Note.midiName(70), 'Bb4')
    assert.equal(Note.midiName(72), 'C5')
    assert.equal(Note.midiName(72, 'C'), 'C5')
    assert.equal(Note.midiName(72, 'B'), 'B#4')
  },
  'simple note transposition': function () {
    assert.equal(Note('c2').transpose('M2'), 'D2')
    assert.equal(Note('c2').transpose('M-2'), 'Bb1')
    assert.equal(Note('c2').transpose('A-2'), 'Bbb1')
    assert.equal(Note('c2').transpose('M16'), 'D4')
    assert.equal(Note('c2').transpose('M-16'), 'Bb-1')
    assert.equal(Note('e2').transpose('M2'), 'F#2')
    assert.equal(Note('a2').transpose('M3'), 'C#3')
    assert.equal(Note('a2').transpose('d5'), 'Eb3')
  },
  'distance': function () {
    assert.equal(Note('a2').distance('c#3'), 'M3')
    assert.equal(Note('a3').distance('a2'), 'P-8')
  }
}).export(module)
