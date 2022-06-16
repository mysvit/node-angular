import { expect } from 'chai'
import { Simple } from './simple.js'

describe('Simple', () => {

  it('id', () => {
    const result = new Simple({id: '1'})
    expect(result.id).to.equal('1')
  })

  it('property name', () => {
    const result = new Simple({name: 'abc'})
    expect(result.name).to.equal('abc')
  })
})
