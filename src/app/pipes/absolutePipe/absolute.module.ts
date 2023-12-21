import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsolutePipe } from './absolute.pipe';



@NgModule({
  declarations: [AbsolutePipe],
  imports: [
    CommonModule
  ],
  exports:[AbsolutePipe]
})
export class AbsoluteModule { }
