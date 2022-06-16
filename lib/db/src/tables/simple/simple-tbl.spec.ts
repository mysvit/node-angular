import { expect } from 'chai'
import { simpleTbl } from './simple-tbl.js'

describe('Simple', () => {

  it('simpleTbl', () => {
    return simpleTbl().then((data) => {
      expect(data).length(3)
    })
  })

})
