import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {AppComponent} from './app.component'
import {PhotoComponent} from './components/photo/photo.component'
import {PhotosComponent} from './components/photos/photos.component'
import {NotfoundComponent} from './shared/components/notfound/notfound.component'

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: PhotosComponent,
      },
      {
        path: 'photos/:id',
        component: PhotoComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
