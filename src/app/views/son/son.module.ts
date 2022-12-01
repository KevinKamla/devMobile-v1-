import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SonPageRoutingModule } from './son-routing.module';

import { SonPage } from './son.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SonPageRoutingModule
  ],
  declarations: [SonPage]
})
export class SonPageModule {}
