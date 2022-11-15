import { expect } from 'chai'
import { PaginatorLogics } from './paginator'

describe('PaginatorLogics', () => {

    it('totalPages(9,10,10) => 1', () => {
        expect(PaginatorLogics.totalPages(9, 10))
            .to.be.eq(1)
    })

    it('totalPages(10,10,10) => 1', () => {
        expect(PaginatorLogics.totalPages(10, 10))
            .to.be.eq(1)
    })

    it('totalPages(11,10,10) => 2', () => {
        expect(PaginatorLogics.totalPages(11, 10))
            .to.be.eq(2)
    })

    it('totalPages(101,10,10) => 10', () => {
        expect(PaginatorLogics.totalPages(101, 10))
            .to.be.eq(11)
    })


    it('rangePages [[1], 2, 3, 4, 5, 6, 7, 8, 9, 10] => NOT CHANGED', () => {
        expect(PaginatorLogics.rangePages(1, 1, 20, 10))
            .to.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('rangePages [1, 2, 3, 4, 5, [6], 7, 8, 9, 10] => NOT CHANGED', () => {
        expect(PaginatorLogics.rangePages(1, 6, 20, 10))
            .to.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('rangePages [[6], 7, 8, 9, 10, 11, 12, 13, 14, 15] => [1, 2, 3, 4, 5, [6], 7, 8, 9, 10]', () => {
        expect(PaginatorLogics.rangePages(6, 6, 20, 10))
            .to.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('rangePages [1, 2, 3, 4, 5, 6, 7, 8, 9, [10]] => [6, 7, 8, 9, [10], 11, 12, 13, 14 ,15]', () => {
        expect(PaginatorLogics.rangePages(1, 10, 20, 10))
            .to.deep.eq([6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    })

    it('rangePages [1, 2, 3, 4, 5, 6, 7, 8, 9, [10]] => [6, 7, 8, 9, [10], 11, 12]', () => {
        expect(PaginatorLogics.rangePages(1, 10, 12, 10))
            .to.deep.eq([6, 7, 8, 9, 10, 11, 12])
    })

    it('rangePages [[6], 7, 8, 9, 10, 11, 12] => [1, 2, 3, 4, 5, [6], 7, 8, 9, 10]', () => {
        expect(PaginatorLogics.rangePages(6, 6, 12, 10))
            .to.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('rangePages [[7], 8, 9, 10] => [5, 6, [7], 8, 9]', () => {
        expect(PaginatorLogics.rangePages(7, 7, 10, 5))
            .to.deep.eq([5, 6, 7, 8, 9])
    })

    it('startRangeForLastRange(10,10) => 1', () => {
        expect(PaginatorLogics.startRangeForLastRange(10, 10)).to.be.eq(1)
    })

    it('startRangeForLastRange(12,10) => 6', () => {
        expect(PaginatorLogics.startRangeForLastRange(12, 10)).to.be.eq(6)
    })

    it('startRangeForLastRange(17,10) => 11', () => {
        expect(PaginatorLogics.startRangeForLastRange(17, 10)).to.be.eq(11)
    })

})
