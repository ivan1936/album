import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss'],
})
export class Pagination {
  @Input() total_pages: number
  @Input() currentPage: number

  @Output() updatePage = new EventEmitter<number>()

  onClick(event) {
    this.updatePage.emit(+event.target.value)
    console.log(event)
  }
}
