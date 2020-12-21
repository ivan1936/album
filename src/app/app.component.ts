import {Component, OnInit} from '@angular/core'

import {CURRENT_PAGE, SEARCH_STRING} from 'src/app/shared/constants'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    localStorage.setItem(CURRENT_PAGE, JSON.stringify(1))
    localStorage.setItem(SEARCH_STRING, JSON.stringify('alma ata'))
  }
}
