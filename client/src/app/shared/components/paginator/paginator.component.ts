import { Component, EventEmitter, Input, Output } from '@angular/core'
import { PaginatorLogics } from '@shared-lib/logic'
import { PaginatorEvent, PaginatorOptions } from '@shared/components/paginator/paginator.model'

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

    @Input() options: PaginatorOptions = {
        pageSize: 10,
        pagesMaxLength: 10
    }

    @Input() set itemsLength(value: number) {
        this.totalPages = PaginatorLogics.totalPages(value, this.options.pageSize)
        this.buildButtons(this.totalPages, this.event, this.options)
    }

    @Output() onPageChange: EventEmitter<PaginatorEvent> = new EventEmitter<PaginatorEvent>()

    pagesButtons: Array<number> = []
    event: PaginatorEvent = <PaginatorEvent>{startPagesRange: 1, pageNum: 1, limit: {offset: 0, fetch: 0}}

    private totalPages: number = 0

    handleFirstPageClick() {
        this.event.startPagesRange = 1
        this.event.pageNum = 1
        this.setLimit()
        this.buildButtons(this.totalPages, this.event, this.options)
        this.onPageChange.emit(this.event)
    }

    handlePrevClick() {
        if (this.event.pageNum > 1) this.event.pageNum--
        this.setLimit()
        this.buildButtons(this.totalPages, this.event, this.options)
        this.onPageChange.emit(this.event)
    }

    handleForwardClick() {
        if (this.event.pageNum < this.totalPages) this.event.pageNum++
        this.setLimit()
        this.buildButtons(this.totalPages, this.event, this.options)
        this.onPageChange.emit(this.event)
    }

    handleLastPageClick() {
        this.event.startPagesRange = PaginatorLogics.startRangeForLastRange(this.totalPages, this.options.pagesMaxLength)
        this.event.pageNum = this.totalPages
        this.setLimit()
        this.buildButtons(this.totalPages, this.event, this.options)
        this.onPageChange.emit(this.event)
    }

    handlePageSelectClick(pageNum: number) {
        this.event.pageNum = pageNum
        this.setLimit()
        this.buildButtons(this.totalPages, this.event, this.options)
        this.onPageChange.emit(this.event)
    }

    private buildButtons(totalPages: number, event: PaginatorEvent, options: PaginatorOptions) {
        this.pagesButtons = PaginatorLogics.rangePages(event.startPagesRange, event.pageNum, totalPages, options.pagesMaxLength)
        event.startPagesRange = this.pagesButtons[0] ?? 1
    }

    private setLimit() {
        this.event.limit.offset = ((this.event.pageNum - 1) * this.options.pageSize)
        this.event.limit.fetch = this.options.pageSize
    }

}
