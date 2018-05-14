import { NgModule } from '@angular/core';
import { CountPipe } from "./count.pipe";
import { ImagePipe } from "./image.pipe";
import { StatusPipe } from "./status.pipe"

@NgModule({
  imports: [
    
  ],
  declarations: [
    CountPipe,
    ImagePipe,
    StatusPipe
  ],

  exports: [
    CountPipe,
    ImagePipe,
    StatusPipe
  ]
})
export class PipeModule { }
