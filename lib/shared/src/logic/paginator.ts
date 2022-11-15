export namespace PaginatorLogics {

    export function totalPages(itemsLength: number, pageSize: number): number {
        let totalPages = Math.floor(itemsLength / pageSize)
        if ((itemsLength % pageSize) > 0) {
            totalPages += 1
        }
        return totalPages
    }

    export function rangePages(startRange: number, pageNum: number, totalPages: number, pagesMaxLength: number): Array<number> {
        let range = []
        let num = startRange
        while ((num <= totalPages) && (range.length < pagesMaxLength)) {
            range.push(num)
            num++
        }
        // modify range
        let steps = Math.floor(pagesMaxLength / 2)
        // to begin
        if (range[0] === pageNum && range[0] > 1) {
            // [6]                                        [6]
            // [6,7,8,9,10,11,12,13,14,15]  =>  [1,2,3,4,5,6,7,8,9,10]
            for (let i = 0; i < steps; i++) {
                range.splice(0, 0, range[0] - 1)
                if (range[range.length - 1] > pagesMaxLength && range.length > pagesMaxLength) {
                    range.splice(range.length - 1, 1)
                }
            }
        }
        // to end
        if (range[range.length - 1] === pageNum && range[range.length - 1] < totalPages) {
            //                   [10]            [10]
            // [1,2,3,4,5,6,7,8,9,10] => [6,7,8,9,10,11,12,13,14,15]
            for (let i = 0; i < steps; i++) {
                range.splice(0, 1)
                if (range[range.length - 1] < totalPages) {
                    range.push(range[range.length - 1] + 1)
                }
            }
        }
        return range
    }

    // 17, 10
    export function startRangeForLastRange(totalPages: number, pagesMaxLength: number): number {
        let startPagesRange = (Math.floor(totalPages / pagesMaxLength) * pagesMaxLength) - pagesMaxLength
        startPagesRange += 1
        // 5
        const steps = Math.floor(pagesMaxLength / 2)
        // 17 => 7
        if (totalPages % pagesMaxLength > 0) {
            // 7 > 5
            if (totalPages % pagesMaxLength >= steps) {
                startPagesRange += pagesMaxLength
            } else {
                startPagesRange += steps
            }
        }
        return startPagesRange
    }

}
