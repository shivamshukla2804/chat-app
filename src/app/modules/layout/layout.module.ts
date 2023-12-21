import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {MatIconModule} from '@angular/material/icon';
import { AbsoluteModule } from '../../pipes/absolutePipe/absolute.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatIconModule,
    AbsoluteModule
  ]
})
export class LayoutModule { }
