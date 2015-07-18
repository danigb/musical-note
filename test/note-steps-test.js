var vows = require('vows')
var assert = require('assert')
var steps = require('../note-steps.js')

vows.describe('Note').addBatch({
  'distance': function () {
    assert.equal(steps('C', 'C'), 1)
    assert.equal(steps('C', 'D'), 2)
    assert.equal(steps('C', 'B'), 7)
    assert.equal(steps('C', 'B', true), -2)
    assert.equal(steps('C', 'G', false), 5)
    assert.equal(steps('C', 'G', true), -4)
  },
  'move': function () {
    assert.equal(steps('C', 1), 'C')
    assert.equal(steps('C', 2), 'D')
    assert.equal(steps('C', -2), 'B')
    assert.equal(steps('C', 8), 'C')
    assert.equal(steps('C', 9), 'D')
    assert.equal(steps('C', -9), 'B')
  }
}).export(module)
