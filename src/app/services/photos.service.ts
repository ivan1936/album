import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {of, Observable} from 'rxjs'
import {filter, map, shareReplay, tap} from 'rxjs/operators'
import {baseUrl, perPage} from 'src/environments/environment'
import {accessKey} from 'src/environments/environment'
import {Photos} from './../model/photos'
import {Photo} from '../model/photo'

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  searchResults$: Observable<Photos>

  constructor(private http: HttpClient) {}

  searchPhotos(
    search: string = 'astrakhan',
    currentPage: number = 1
  ): Observable<Photos> {
    const url = baseUrl + '/search/photos'
    return this.http
      .get<any[]>(url, {
        params: {
          client_id: accessKey,
          query: search,
          page: currentPage.toString(),
          per_page: perPage.toString(),
        },
      })
      .pipe(
        map((res) => [res['results'], res['total'], res['total_pages']]),
        map((res2) => {
          const photos = res2[0].map((photo) => ({
            id: photo.id,
            description: photo.description,
            urls: [photo['urls'].small, photo['urls'].regular],
          }))

          return {
            photos,
            total: res2[1],
            total_pages: res2[2],
          }
        }),
        shareReplay(1)
      )
  }

  onSearch(searchStr, currentPage) {
    this.searchResults$ = this.searchPhotos(searchStr, currentPage)
    return this.searchResults$
  }

  onSearchPhoto(id: string): Observable<Photo> {
    return this.searchResults$.pipe(
      map((value) => value.photos),
      //filter((photos) => photos.filter(photo => photo.id === id)),
      map((photos) => photos.filter((photo) => photo.id === id)),
      map((p) => p[0])
    )
  }
}
