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

    getColor(color: any){
        let c = color.main;
        let r = c.r.toString(16);
        r = (r.length === 1 ? '0' : '') + r;

        let g = c.g.toString(16);
        g = (g.length === 1 ? '0' : '') + g;

        let b = c.b.toString(16);
        b = (b.length === 1 ? '0' : '') + b;

        return '#' + r + g + b;
    }

    setColor(c: any){
        this._ttcs.color = c;
    }
}
