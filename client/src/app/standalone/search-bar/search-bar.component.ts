import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
    standalone: true,
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    imports: [
        CommonModule,
        FormsModule
    ],
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>()

    searchText?: string

    handleSearchClick() {
        this.onSearch.emit(this.searchText)
    }

    handleClearClick() {
        this.searchText = undefined
        this.onSearch.emit(this.searchText)
    }

}
