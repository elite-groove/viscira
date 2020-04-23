import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelaxHomePageRoutingModule } from './relax-home-routing.module';

import { RelaxHomePage } from './relax-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelaxHomePageRoutingModule
  ],
  declarations: [RelaxHomePage]
})
export class RelaxHomePageModule {}
