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

  context('listeners', () => {
    it('fires onChange', (done) => {
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

    it('fires onChange several times with sync update', (done) => {
      var fireCounter = 0
      store.on('change', (state) => {
        fireCounter++
        if (fireCounter === 3) {
          done()
        }
      })
      store.setSync('key1', 'value1')
      store.setSync('key2', 'value2')
      store.setSync('key3', 'value3')
    })

    it('fires "once" only once', (done) => {
      store.once('change', () => {
        done()
      })
      store.set('key1', 'value')
      setTimeout(() => {
        store.set('key2', 'value')
      }, 0)
    })

    it('emits second change event if data was changed inside first one', (done)=> {
      store.merge({
        a: 1,
        b: 2,
        c: {
          d: 3
        }
      })
      var changeCounter = 0
      store.on('change', (data) => {
        store.setIn(['c', 'd'], 5)
        if (++changeCounter == 2) {
          assert(data.c.d === 5)
          done()
        }
      })

      store.setIn(['c', 'd'], 4)
    })
  })

  it('converts js objects to immutable structures', (done) => {
    store.on('change', (state) => {
      assert.deepEqual(state, {
        obj: {
          key1: 1,
          key2: 2,
          key3: 3
        },
        arr: ['a', 'b', 'c']
      })
      done()
    })
    store.set('obj', {
      key1: 1,
      key2: 2,
      key3: 3
    })
    store.set('arr', ['a', 'b', 'c'])

    assert(store.get('obj').get('key1') === 1)
  })

  context('clear', () => {
    it('clears', ()=> {
      store.merge({a: 1})
      store.clear()
      store.merge({b: 2})
      assert.deepEqual(store.get(), {b: 2})
    })

    it('chainable', ()=> {
      assert.deepEqual(store.set('a', 1).clear().set('b', 2).get(), {b: 2})
    })

    it('triggers onChange', (done) => {
      store.on('change', (props) => {
        assert.deepEqual(props, {})
        done()
      })

      store.merge({
        a: 1
      })
      store.clear()
    })
  })

  context('merge', () => {
    it('merges key', (done) => {
      store.on('change', (state) => {
        assert.deepEqual(state, {
          a: 1,
          b: [1,2,3],
          c: 'string',
          d: true
        })
        done()
      })

      store.merge({
        a: 1,
        b: [1,2,3],
        c: 'string',
        d: true
      })

      assert(store.get('a') === 1)
      assert.deepEqual(store.get('b').toJS(), [1,2,3])
      assert(store.get('c') === 'string')
      assert(store.get('d') === true)
    })

    it('merges in path', () => {
      store.merge({
        a: {
          b: {
            c: 1
          }
        }
      })
      store.mergeIn(['a', 'b', 'c'], {d: 1})
      assert.deepEqual(store.get(), {
        a: {
          b: {
            c: {
              d: 1
            }
          }
        }
      })
    })

    it('chaining', () => {
      assert(store.merge({
        a: 1,
        b: [1,2,3],
        c: {key: 'value'},
        d: true
      }).getIn(['c', 'key']) === 'value')
    })
  })

  context('delete', () => {
    it('deletes key', ()=> {
      store.merge({
        a: 1,
        b: 2
      })
      store.delete('a')
      assert.deepEqual(store.get(), {b: 2})
    })

    it('deletes in path', () => {
      store.merge({
        a: {
          b: 1,
          c: 2
        },
      })
      store.deleteIn(['a', 'b'])
      assert.deepEqual(store.get(), {a: {c : 2}})
    })

    it('chainable', () => {
      store.merge({
        a: 1,
        b: 2
      })
      store.delete('a').delete('b')
      assert.deepEqual(store.get(), {})
    })

    it('triggers onChange', (done) => {
      store.on('change', (props) => {
        assert.deepEqual(props, {b: 2})
        done()
      })
      store.merge({
        a: 1,
        b: 2
      })
      store.delete('a')
    })
  })
})
