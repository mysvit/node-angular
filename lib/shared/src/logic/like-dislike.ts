export interface LikeDislikeCalc {
    likeUsr: number
    dislikeUsr: number
    likeCount: number
    dislikeCount: number
}

export namespace LikeDislike {

    export function calc(like: number, dislike: number, likeCur: number, dislikeCur: number): LikeDislikeCalc {
        const likeUsr = (like === 1 && likeCur === 1) ? 0 : like
        const dislikeUsr = likeUsr === 1 ? 0
            : (dislike === 1 && dislikeCur === 1) ? 0
                : dislike
        const likeCount = likeUsr + (likeCur ?? 0) * -1
        const dislikeCount = dislikeUsr + (dislikeCur ?? 0) * -1
        return <LikeDislikeCalc>{likeUsr: likeUsr, dislikeUsr: dislikeUsr, likeCount: likeCount, dislikeCount: dislikeCount}
    }

}
