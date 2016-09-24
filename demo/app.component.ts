import { Component } from '@angular/core';
import 'rxjs/add/operator/take';

import { ttcService } from '../src';

@Component({
    selector: 'my-app',
    templateUrl : '../demo/app.component.html'
})
export class AppComponent {

    //noinspection SpellCheckingInspection
    constructor(public _ttcs: ttcService){}

    setMulti(e: any){
        this._ttcs.multi = e;
    }

    setModulo(e: any){
        this._ttcs.mod = e;
    }
}
