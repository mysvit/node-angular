export class MenuPosition {

    static getPosition(nativeElement: any) {
        const offsetTop = nativeElement.offsetTop
        const offsetLeft = nativeElement.offsetLeft
        const offsetHeight = nativeElement.offsetHeight
        const offsetWidth = nativeElement.offsetWidth

        const clientWidth = document.documentElement.clientWidth
        const clientHeight = document.documentElement.clientHeight

        const halfWidth = clientWidth / 2
        const halfHeight = clientHeight / 2

        // is Top or Bottom
        const isTop = offsetTop < halfHeight
        // is Left or Right
        const isLeft = offsetLeft < halfWidth

        const result: any = {}

        if (isTop) {
            result['top'] = offsetTop + offsetHeight + 'px'
        } else {
            result['bottom'] = clientHeight - offsetTop + 'px'
        }

        if (isLeft) {
            result['left'] = offsetLeft + 'px'
        } else {
            result['right'] = (clientWidth - offsetLeft) - offsetWidth + 'px'
        }

        return result
    }

}
