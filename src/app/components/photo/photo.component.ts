import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Observable} from 'rxjs'
import {Photo} from 'src/app/model/photo'
import {PhotosService} from 'src/app/services/photos.service'

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  id: string
  photo$: Observable<Photo>

  constructor(
    private route: ActivatedRoute,
    private photosService: PhotosService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.photo$ = this.photosService.onSearchPhoto(this.id)
    this.photo$.subscribe((p) => console.log(p))
  }
}
