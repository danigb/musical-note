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
    assert.deepEqual(Note.fromMidi(60), new Note('C4'))
    assert.deepEqual(Note.fromMidi(69), new Note('A4'))
    assert.deepEqual(Note.fromMidi(70), new Note('Bb4'))
    assert.deepEqual(Note.fromMidi(72), new Note('C5'))
    assert.deepEqual(Note.fromMidi(72, 'C'), new Note('C5'))
    assert.deepEqual(Note.fromMidi(72, 'B'), new Note('B#4'))
  },
  'simple note transposition': function () {
    assert.deepEqual(Note('c2').transpose('M2'), new Note('d2'))
    assert.deepEqual(Note('c2').transpose('M-2'), new Note('Bb1'))
    assert.deepEqual(Note('c2').transpose('A-2'), new Note('Bbb1'))
    assert.deepEqual(Note('c2').transpose('M16'), new Note('d4'))
    assert.deepEqual(Note('c2').transpose('M-16'), new Note('Bb-1'))
    assert.deepEqual(Note('e2').transpose('M2'), new Note('f#2'))
    assert.deepEqual(Note('a2').transpose('M3'), new Note('c#3'))
    assert.deepEqual(Note('a2').transpose('d5'), new Note('eb3'))
  },
  'distance': function () {
    assert.equal(Note('a2').distance('c#3').name, 'M3')
    assert.equal(Note('a3').distance('a2').name, 'P-8')
  }
}).export(module)
