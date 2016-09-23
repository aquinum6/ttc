import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ttcComponent } from './directives/canvas.comp';
import { ttcService } from './directives/canvas.service';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ttcComponent ],
    exports: [ ttcComponent ],
    providers: [ ttcService ]
})
export class ttcModule { }