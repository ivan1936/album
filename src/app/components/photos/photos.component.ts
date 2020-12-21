import {Component, ElementRef, ViewChild} from '@angular/core'
import {from, Observable} from 'rxjs'
import {PhotosService} from 'src/app/services/photos.service'
import {Photos} from 'src/app/model/photos'
import {CURRENT_PAGE, SEARCH_STRING} from 'src/app/shared/constants'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {
  @ViewChild('searchInput') searchInput: ElementRef

  searchResults$: Observable<Photos>
  currentPage: number = +localStorage.getItem(CURRENT_PAGE)
  searchStr: string = localStorage.getItem(SEARCH_STRING)

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
    if (!this.photosService.searchResults$) {
      this.searchResults$ = this.photosService.onSearch(
        this.searchStr,
        this.currentPage
      )
    } else {
      this.searchResults$ = this.photosService.searchResults$
    }
  }

  updateSearchStr(str: string) {
    if (!str) return
    this.searchStr = str
    localStorage.setItem(SEARCH_STRING, JSON.stringify(str))
    this.currentPage = 1
    this.searchResults$ = this.photosService.onSearch(
      this.searchStr,
      this.currentPage
    )
  }

  updatePage(page: number) {
    this.currentPage = page
    localStorage.setItem(CURRENT_PAGE, JSON.stringify(page))
    this.searchResults$ = this.photosService.onSearch(
      this.searchStr,
      this.currentPage
    )
  }
}
