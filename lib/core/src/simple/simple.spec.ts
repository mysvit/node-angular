import { expect } from 'chai'
import { simpleList } from './simple.js'

describe('Simple', () => {

  it('simpleList', () => {
    return simpleList().then((data) => {
      expect(data).length(3)
    })
  })

})

