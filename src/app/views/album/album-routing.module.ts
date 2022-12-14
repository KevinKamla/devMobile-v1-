import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumPage } from './album.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumPage
  },
  {
    path: 'son',
    loadChildren: () => import('../../views/son/son.module').then( m => m.SonPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumPageRoutingModule {}
