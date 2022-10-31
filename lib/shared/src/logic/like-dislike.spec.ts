import { expect } from 'chai'
import { LikeDislike, LikeDislikeCalc } from './like-dislike'

describe('LikeDislike', () => {

    it('calc [1,0 : 0,0] => 1,0 | 1,0', () => {
        expect(LikeDislike.calc(1, 0, 0, 0)).to.deep.eq(<LikeDislikeCalc>{likeUsr: 1, dislikeUsr: 0, likeCount: 1, dislikeCount: 0})
    })

    it('calc [1,0 : 1,0] => 0,0 | -1,0', () => {
        expect(LikeDislike.calc(1, 0, 1, 0)).to.deep.eq(<LikeDislikeCalc>{likeUsr: 0, dislikeUsr: 0, likeCount: -1, dislikeCount: 0})
    })

    it('calc 1,0 = 0,1 => 1,0 | 1,-1', () => {
        expect(LikeDislike.calc(1, 0, 0, 1)).to.deep.eq(<LikeDislikeCalc>{likeUsr: 1, dislikeUsr: 0, likeCount: 1, dislikeCount: -1})
    })

    it('calc 0,1 = 0,0 => 0,1 | 0,1', () => {
        expect(LikeDislike.calc(0, 1, 0, 0)).to.deep.eq(<LikeDislikeCalc>{likeUsr: 0, dislikeUsr: 1, likeCount: 0, dislikeCount: 1})
    })

    it('calc 0,1 = 0,1 => 0,0 | 0,-1', () => {
        expect(LikeDislike.calc(0, 1, 0, 1)).to.deep.eq(<LikeDislikeCalc>{likeUsr: 0, dislikeUsr: 0, likeCount: 0, dislikeCount: -1})
    })

    it('calc 0,1 = 1,0 => 0,1 | -1,1', () => {
        expect(LikeDislike.calc(0, 1, 1, 0)).to.deep.eq(<LikeDislikeCalc>{likeUsr: 0, dislikeUsr: 1, likeCount: -1, dislikeCount: 1})
    })

    it('calc 0,1 = 1,0 => 0,1 | -1,1', () => {
        expect(LikeDislike.calc(0, 1, 1, 0)).to.deep.eq(<LikeDislikeCalc>{likeUsr: 0, dislikeUsr: 1, likeCount: -1, dislikeCount: 1})
    })



    it('calc [1,0 : undefined, 0] => 1,0 | 1,0', () => {
        expect(LikeDislike.calc(1, 0, undefined, 0))
            .to.deep.eq(<LikeDislikeCalc>{likeUsr: 1, dislikeUsr: 0, likeCount: 1, dislikeCount: 0})
    })

    it('calc [0,1 : undefined, 0] => 1,0 | 1,0', () => {
        expect(LikeDislike.calc(0, 1, undefined, 0))
            .to.deep.eq(<LikeDislikeCalc>{likeUsr: 0, dislikeUsr: 1, likeCount: 0, dislikeCount: 1})
    })

    it('calc [1,0 : 0, undefined] => 0,1 | 0,1', () => {
        expect(LikeDislike.calc(0, 1, 0, undefined))
            .to.deep.eq(<LikeDislikeCalc>{likeUsr: 0, dislikeUsr: 1, likeCount: 0, dislikeCount: 1})
    })

    it('calc [0,1 : 0, undefined] => 0,0 | 0,0', () => {
        expect(LikeDislike.calc(0, 1, 0, undefined))
            .to.deep.eq(<LikeDislikeCalc>{likeUsr: 0, dislikeUsr: 1, likeCount: 0, dislikeCount: 1})
    })

})
