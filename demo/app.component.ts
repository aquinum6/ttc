import { Component } from '@angular/core';
import 'rxjs/add/operator/take';

import { ttcService } from '../src';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl : './app.component.html'
})
export class AppComponent {

    constructor(public _ttcs: ttcService){}

    addModulo(){
        this._ttcs.mod$
            .take(1)
            .subscribe(e => {
                console.log(e);
                this._ttcs.mod = e + 1;
            });
    }

    subModulo(){
        this._ttcs.mod$
            .take(1)
            .subscribe(e => {
                console.log(e);
                this._ttcs.mod = e - 1;
            });
    }



}
