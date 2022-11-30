import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SonPage } from './son.page';

const routes: Routes = [
  {
    path: '',
    component: SonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SonPageRoutingModule {}
