var assert = require('assert')
var Shlux = require('./')

describe('Shlux', () => {
  var store

  beforeEach(() => {
    store = new Shlux()
  })

  it('simply sets and gets key', () => {
    store.set('key', 'value')
    assert(store.get('key') === 'value')
  })

  it('fire onChange', (done) => {
    store.on('change', (state) => {
      assert(state.key === 'value')
      done()
    })
    store.set('key', 'value')
  })

  it('fires several onChanges', () => {
    var changeCounter = 0
    var change = () => { if (changeCounter++ == 2) { done() } }
    store.on('change', change)
    store.on('change', change)
    store.set('key', 'value')
  })

  it('fires onChanges on deep change', (done) => {
    store.on('change', (state) => {
      assert(state.deep.object.inside.key === 'newValue')
      done()
    })
    store.set('deep', {
      'object': {
        'inside': {
          'key': 'value'
        }
      }
    })
    store.get('deep').get('object').get('inside').set('key', 'newValue')
  })

  it('fires onChange only once on multiply changes', (done) => {
    store.on('change', (state) => {
      assert.deepEqual(state, {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      })
      done()
    })
    store.set('key1', 'value1')
    store.set('key2', 'value2')
    store.set('key3', 'value3')
  })
})
