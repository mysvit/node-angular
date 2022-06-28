// import { expect } from 'chai'
// import { isArray, isArrayNew } from './array-helper.js'
//
// describe('Array Helper', () => {
//
//     it('isArray', () => {
//         expect(isArray(undefined)).to.false
//     })
//     it('isArrayNew', () => {
//         expect(isArrayNew(undefined)).to.false
//     })
//
// })
//
// describe('Array Helper Performance', () => {
//
//     it('isArray', () => {
//         // const startTime = performance.now()
//         for (let i = 0; i < 10000; i++) {
//             expect(isArray([undefined, 1])).to.true
//         }
//         // const endTime = performance.now()
//         // console.log(`Call to isArray took ${endTime - startTime} milliseconds`)
//     })
//     it('isArrayNew', () => {
//         // const startTime = performance.now()
//         for (let i = 0; i < 10000; i++) {
//             expect(isArrayNew([undefined, 1])).to.true
//         }
//         // const endTime = performance.now()
//         // console.log(`Call to isArray took ${endTime - startTime} milliseconds`)
//     })
//
// })